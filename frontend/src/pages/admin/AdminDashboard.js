import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppBar, Drawer } from '../../components/styles';
import Logout from '../Logout';
import SideBar from './SideBar';
import AdminProfile from './AdminProfile';
import AdminHomePage from './AdminHomePage';

import AddStudent from './studentRelated/AddStudent';
import SeeComplains from './studentRelated/SeeComplains';
import ShowStudents from './studentRelated/ShowStudents';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';
import ViewStudent from './studentRelated/ViewStudent';

import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';

import ShowHostels from './hostelRelated/ShowHostels';
import HostelForm from './hostelRelated/HostelForm';
import ViewHostel from './hostelRelated/ViewHostel';

import AddWarden from './wardenRelated/AddWarden';
import ChooseBatch from './wardenRelated/ChooseBatch';
import ChooseHostel from './wardenRelated/ChooseHostel';
import ShowWardens from './wardenRelated/ShowWardens';
import WardenDetails from './wardenRelated/WardenDetails';

import AddBatch from './batchRelated/AddBatch';
import BatchDetails from './batchRelated/BatchDetails';
import ShowBatches from './batchRelated/ShowBatches';
import AccountMenu from '../../components/AccountMenu';

const AdminDashboard = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar open={open} position='absolute'>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Admin Dashboard
                        </Typography>
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                    <Toolbar sx={styles.toolBarStyled}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <SideBar />
                    </List>
                </Drawer>
                <Box component="main" sx={styles.boxStyled}>
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<AdminHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Admin/dashboard" element={<AdminHomePage />} />
                        <Route path="/Admin/profile" element={<AdminProfile />} />
                        <Route path="/Admin/complains" element={<SeeComplains />} />

                        {/* Notice */}
                        <Route path="/Admin/addnotice" element={<AddNotice />} />
                        <Route path="/Admin/notices" element={<ShowNotices />} />

                        {/* Hostel */}
                        <Route path="/Admin/hostels" element={<ShowHostels />} />
                        <Route path="/Admin/hostels/hostel/:batchID/:hostelID" element={<ViewHostel />} />
                        <Route path="/Admin/hostels/choosebatch" element={<ChooseBatch situation="Hostel" />} />

                        <Route path="/Admin/addhostel/:id" element={<HostelForm />} />
                        <Route path="/Admin/batch/hostel/:batchID/:hostelID" element={<ViewHostel />} />

                        <Route path="/Admin/hostel/student/attendance/:studentID/:hostelID" element={<StudentAttendance situation="Hostel" />} />
                        <Route path="/Admin/hostel/student/marks/:studentID/:hostelID" element={<StudentExamMarks situation="Hostel" />} />

                        {/* Batch */}
                        <Route path="/Admin/addbatch" element={<AddBatch />} />
                        <Route path="/Admin/batches" element={<ShowBatches />} />
                        <Route path="/Admin/batches/batch/:id" element={<BatchDetails />} />
                        <Route path="/Admin/batch/addstudents/:id" element={<AddStudent situation="Batch" />} />

                        {/* Student */}
                        <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
                        <Route path="/Admin/students" element={<ShowStudents />} />
                        <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
                        <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
                        <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />

                        {/* Warden */}
                        <Route path="/Admin/wardens" element={<ShowWardens />} />
                        <Route path="/Admin/wardens/warden/:id" element={<WardenDetails />} />
                        <Route path="/Admin/wardens/choosebatch" element={<ChooseBatch situation="Warden" />} />
                        <Route path="/Admin/wardens/choosehostel/:id" element={<ChooseHostel situation="Norm" />} />
                        <Route path="/Admin/wardens/choosehostel/:batchID/:wardenID" element={<ChooseHostel situation="Warden" />} />
                        <Route path="/Admin/wardens/addwarden/:id" element={<AddWarden />} />

                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default AdminDashboard

const styles = {
    boxStyled: {
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
    },
    drawerStyled: {
        display: "flex"
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
}