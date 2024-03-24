import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material'
import { getAllBatches } from '../../../redux/batchRelated/batchHandle';
import { useNavigate } from 'react-router-dom';
import { PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';

const ChooseBatch = ({ situation }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { batchesList, loading, error, getresponse } = useSelector((state) => state.batch);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllBatches(currentUser._id, "Batch"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error)
    }

    const navigateHandler = (batchID) => {
        if (situation === "Warden") {
            navigate("/Admin/wardens/choosehostel/" + batchID)
        }
        else if (situation === "Hostel") {
            navigate("/Admin/addhostel/" + batchID)
        }
    }

    const batchColumns = [
        { id: 'name', label: 'Batch Name', minWidth: 170 },
    ]

    const batchRows = batchesList && batchesList.length > 0 && batchesList.map((batch) => {
        return {
            name: batch.batchName,
            id: batch._id,
        };
    })

    const BatchButtonHaver = ({ row }) => {
        return (
            <>
                <PurpleButton variant="contained"
                    onClick={() => navigateHandler(row.id)}>
                    Choose
                </PurpleButton>
            </>
        );
    };

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {getresponse ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <Button variant="contained" onClick={() => navigate("/Admin/addbatch")}>
                                Add Batch
                            </Button>
                        </Box>
                        :
                        <>
                            <Typography variant="h6" gutterBottom component="div">
                                Choose a batch
                            </Typography>
                            {Array.isArray(batchesList) && batchesList.length > 0 &&
                                <TableTemplate buttonHaver={BatchButtonHaver} columns={batchColumns} rows={batchRows} />
                            }
                        </>}
                </>
            }
        </>
    )
}

export default ChooseBatch