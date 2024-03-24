import React, { useEffect } from 'react';
import { getWardenDetails } from '../../../redux/wardenRelated/wardenHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography } from '@mui/material';

const WardenDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, wardenDetails, error } = useSelector((state) => state.warden);

    const wardenID = params.id;

    useEffect(() => {
        dispatch(getWardenDetails(wardenID));
    }, [dispatch, wardenID]);

    if (error) {
        console.log(error);
    }

    const isHostelNamePresent = wardenDetails?.teachHostel?.subName;

    const handleAddHostel = () => {
        navigate(`/Admin/wardens/choosehostel/${wardenDetails?.teachBatch?._id}/${wardenDetails?._id}`);
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Container>
                    <Typography variant="h4" align="center" gutterBottom>
                        Warden Details
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Warden Name: {wardenDetails?.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Batch Name: {wardenDetails?.teachBatch?.batchName}
                    </Typography>
                    {isHostelNamePresent ? (
                        <>
                            <Typography variant="h6" gutterBottom>
                                Hostel Name: {wardenDetails?.teachHostel?.subName}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Hostel Sessions: {wardenDetails?.teachHostel?.sessions}
                            </Typography>
                        </>
                    ) : (
                        <Button variant="contained" onClick={handleAddHostel}>
                            Add Hostel
                        </Button>
                    )}
                </Container>
            )}
        </>
    );
};

export default WardenDetails;