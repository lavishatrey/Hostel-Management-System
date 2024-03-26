import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getHostelList } from '../../redux/batchRelated/batchHandle';
import { BottomNavigation, BottomNavigationAction, Container, Paper, Table, TableBody, TableHead, Typography } from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart'

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const StudentHostels = () => {

    const dispatch = useDispatch();
    const { hostelsList, batchDetails } = useSelector((state) => state.batch);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id])

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [hostelMarks, setHostelMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setHostelMarks(userDetails.examResult || []);
        }
    }, [userDetails])

    useEffect(() => {
        if (hostelMarks.length === 0) {
            dispatch(getHostelList(currentUser.batchName._id, "BatchHostels"));
        }
    }, [hostelMarks, dispatch, currentUser.batchName._id]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <>
                <Typography variant="h4" align="center" gutterBottom>
                    Hostel Marks
                </Typography>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Hostel</StyledTableCell>
                            <StyledTableCell>Marks</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {hostelMarks.map((result, index) => {
                            if (!result.subName || !result.marksObtained) {
                                return null;
                            }
                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                    <StyledTableCell>{result.marksObtained}</StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </>
        );
    };

    const renderChartSection = () => {
        return <CustomBarChart chartData={hostelMarks} dataKey="marksObtained" />;
    };

    const renderBatchDetailsSection = () => {
        return (
            <Container>
                <Typography variant="h4" align="center" gutterBottom>
                    Batch Details
                </Typography>
                <Typography variant="h5" gutterBottom>
                    You are currently in Batch {batchDetails && batchDetails.batchName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    And these are the hostels:
                </Typography>
                {hostelsList &&
                    hostelsList.map((hostel, index) => (
                        <div key={index}>
                            <Typography variant="subtitle1">
                                {hostel.subName} ({hostel.subCode})
                            </Typography>
                        </div>
                    ))}
            </Container>
        );
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {hostelMarks && Array.isArray(hostelMarks) && hostelMarks.length > 0
                        ?
                        (<>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                                <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                                    <BottomNavigationAction
                                        label="Table"
                                        value="table"
                                        icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                    />
                                    <BottomNavigationAction
                                        label="Chart"
                                        value="chart"
                                        icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                    />
                                </BottomNavigation>
                            </Paper>
                        </>)
                        :
                        (<>
                            {renderBatchDetailsSection()}
                        </>)
                    }
                </div>
            )}
        </>
    );
};

export default StudentHostels;