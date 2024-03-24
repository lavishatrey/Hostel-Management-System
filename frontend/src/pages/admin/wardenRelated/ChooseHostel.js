import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Table, TableBody, TableContainer, TableHead, Typography, Paper } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { getWardenFreeBatchHostels } from '../../../redux/batchRelated/batchHandle';
import { updateTeachHostel } from '../../../redux/wardenRelated/wardenHandle';
import { GreenButton, PurpleButton } from '../../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';

const ChooseHostel = ({ situation }) => {
    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [batchID, setBatchID] = useState("");
    const [wardenID, setWardenID] = useState("");
    const [loader, setLoader] = useState(false)

    const { hostelsList, loading, error, response } = useSelector((state) => state.batch);

    useEffect(() => {
        if (situation === "Norm") {
            setBatchID(params.id);
            const batchID = params.id
            dispatch(getWardenFreeBatchHostels(batchID));
        }
        else if (situation === "Warden") {
            const { batchID, wardenID } = params
            setBatchID(batchID);
            setWardenID(wardenID);
            dispatch(getWardenFreeBatchHostels(batchID));
        }
    }, [situation]);

    if (loading) {
        return <div>Loading...</div>;
    } else if (response) {
        return <div>
            <h1>Sorry all hostels have wardens assigned already</h1>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <PurpleButton variant="contained"
                    onClick={() => navigate("/Admin/addhostel/" + batchID)}>
                    Add Hostels
                </PurpleButton>
            </Box>
        </div>;
    } else if (error) {
        console.log(error)
    }

    const updateHostelHandler = (wardenId, teachHostel) => {
        setLoader(true)
        dispatch(updateTeachHostel(wardenId, teachHostel))
        navigate("/Admin/wardens")
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography variant="h6" gutterBottom component="div">
                Choose a hostel
            </Typography>
            <>
                <TableContainer>
                    <Table aria-label="batches table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell align="center">Hostel Name</StyledTableCell>
                                <StyledTableCell align="center">Hostel Code</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(hostelsList) && hostelsList.length > 0 && hostelsList.map((hostel, index) => (
                                <StyledTableRow key={hostel._id}>
                                    <StyledTableCell component="th" scope="row" style={{ color: "white" }}>
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{hostel.subName}</StyledTableCell>
                                    <StyledTableCell align="center">{hostel.subCode}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {situation === "Norm" ?
                                            <GreenButton variant="contained"
                                                onClick={() => navigate("/Admin/wardens/addwarden/" + hostel._id)}>
                                                Choose
                                            </GreenButton>
                                            :
                                            <GreenButton variant="contained" disabled={loader}
                                                onClick={() => updateHostelHandler(wardenID, hostel._id)}>
                                                {loader ? (
                                                    <div className="load"></div>
                                                ) : (
                                                    'Choose Sub'
                                                )}
                                            </GreenButton>}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        </Paper >
    );
};

export default ChooseHostel;