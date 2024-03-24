import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getBatchDetails, getBatchStudents, getHostelList } from "../../../redux/batchRelated/batchHandle";
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Box, Container, Typography, Tab, IconButton
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { resetHostels } from "../../../redux/batchRelated/batchSlice";
import { BlueButton, GreenButton, PurpleButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';

const BatchDetails = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { hostelsList, batchStudents, batchDetails, loading, error, response, getresponse } = useSelector((state) => state.batch);

    const batchID = params.id

    useEffect(() => {
        dispatch(getBatchDetails(batchID, "Batch"));
        dispatch(getHostelList(batchID, "BatchHostels"))
        dispatch(getBatchStudents(batchID));
    }, [dispatch, batchID])

    if (error) {
        console.log(error)
    }

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)
        // dispatch(deleteUser(deleteID, address))
        //     .then(() => {
        //         dispatch(getBatchStudents(batchID));
        //         dispatch(resetHostels())
        //         dispatch(getHostelList(batchID, "BatchHostels"))
        //     })
    }

    const hostelColumns = [
        { id: 'name', label: 'Hostel Name', minWidth: 170 },
        { id: 'code', label: 'Hostel Code', minWidth: 100 },
    ]

    const hostelRows = hostelsList && hostelsList.length > 0 && hostelsList.map((hostel) => {
        return {
            name: hostel.subName,
            code: hostel.subCode,
            id: hostel._id,
        };
    })

    const HostelsButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Hostel")}>
                    <DeleteIcon color="error" />
                </IconButton>
                <BlueButton
                    variant="contained"
                    onClick={() => {
                        navigate(`/Admin/batch/hostel/${batchID}/${row.id}`)
                    }}
                >
                    View
                </BlueButton >
            </>
        );
    };

    const hostelActions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Hostel',
            action: () => navigate("/Admin/addhostel/" + batchID)
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Hostels',
            action: () => deleteHandler(batchID, "HostelsBatch")
        }
    ];

    const BatchHostelsSection = () => {
        return (
            <>
                {response ?
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <GreenButton
                            variant="contained"
                            onClick={() => navigate("/Admin/addhostel/" + batchID)}
                        >
                            Add Hostels
                        </GreenButton>
                    </Box>
                    :
                    <>
                        <Typography variant="h5" gutterBottom>
                            Hostels List:
                        </Typography>

                        <TableTemplate buttonHaver={HostelsButtonHaver} columns={hostelColumns} rows={hostelRows} />
                        <SpeedDialTemplate actions={hostelActions} />
                    </>
                }
            </>
        )
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ]

    const studentRows = batchStudents.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        };
    })

    const StudentsButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Student")}>
                    <PersonRemoveIcon color="error" />
                </IconButton>
                <BlueButton
                    variant="contained"
                    onClick={() => navigate("/Admin/students/student/" + row.id)}
                >
                    View
                </BlueButton>
                <PurpleButton
                    variant="contained"
                    onClick={() =>
                        navigate("/Admin/students/student/attendance/" + row.id)
                    }
                >
                    Attendance
                </PurpleButton>
            </>
        );
    };

    const studentActions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate("/Admin/batch/addstudents/" + batchID)
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
            action: () => deleteHandler(batchID, "StudentsBatch")
        },
    ];

    const BatchStudentsSection = () => {
        return (
            <>
                {getresponse ? (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton
                                variant="contained"
                                onClick={() => navigate("/Admin/batch/addstudents/" + batchID)}
                            >
                                Add Students
                            </GreenButton>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Students List:
                        </Typography>

                        <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                        <SpeedDialTemplate actions={studentActions} />
                    </>
                )}
            </>
        )
    }

    const BatchTeachersSection = () => {
        return (
            <>
                Teachers
            </>
        )
    }

    const BatchDetailsSection = () => {
        const numberOfHostels = hostelsList.length;
        const numberOfStudents = batchStudents.length;

        return (
            <>
                <Typography variant="h4" align="center" gutterBottom>
                    Batch Details
                </Typography>
                <Typography variant="h5" gutterBottom>
                    This is Batch {batchDetails && batchDetails.batchName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Number of Hostels: {numberOfHostels}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Number of Students: {numberOfStudents}
                </Typography>
                {getresponse &&
                    <GreenButton
                        variant="contained"
                        onClick={() => navigate("/Admin/batch/addstudents/" + batchID)}
                    >
                        Add Students
                    </GreenButton>
                }
                {response &&
                    <GreenButton
                        variant="contained"
                        onClick={() => navigate("/Admin/addhostel/" + batchID)}
                    >
                        Add Hostels
                    </GreenButton>
                }
            </>
        );
    }

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Box sx={{ width: '100%', typography: 'body1', }} >
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
                                    <Tab label="Details" value="1" />
                                    <Tab label="Hostels" value="2" />
                                    <Tab label="Students" value="3" />
                                    <Tab label="Teachers" value="4" />
                                </TabList>
                            </Box>
                            <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                                <TabPanel value="1">
                                    <BatchDetailsSection />
                                </TabPanel>
                                <TabPanel value="2">
                                    <BatchHostelsSection />
                                </TabPanel>
                                <TabPanel value="3">
                                    <BatchStudentsSection />
                                </TabPanel>
                                <TabPanel value="4">
                                    <BatchTeachersSection />
                                </TabPanel>
                            </Container>
                        </TabContext>
                    </Box>
                </>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default BatchDetails;