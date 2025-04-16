import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getHostelList } from '../../../redux/batchRelated/batchHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Paper, Box, IconButton,
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import TableTemplate from '../../../components/TableTemplate';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowHostels = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { hostelsList, loading, error, response } = useSelector((state) => state.batch);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getHostelList(currentUser._id, "AllHostels"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        // setMessage("Sorry the delete function has been disabled for now.")
        // setShowPopup(true)

        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getHostelList(currentUser._id, "AllHostels"));
            })
    }

    const hostelColumns = [
        { id: 'subName', label: 'Sub Name', minWidth: 170 },
        { id: 'sessions', label: 'Sessions', minWidth: 170 },
        { id: 'batchName', label: 'Batch', minWidth: 170 },
    ]

    const hostelRows = hostelsList.map((hostel) => {
        return {
            subName: hostel.subName,
            sessions: hostel.sessions,
            batchName: hostel.batchName.batchName,
            batchID: hostel.batchName._id,
            id: hostel._id,
        };
    })

    const HostelsButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Hostel")}>
                    <DeleteIcon color="error" />
                </IconButton>
                <BlueButton variant="contained"
                    onClick={() => navigate(`/Admin/hostels/hostel/${row.batchID}/${row.id}`)}>
                    View
                </BlueButton>
            </>
        );
    };

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Hostel',
            action: () => navigate("/Admin/hostels/choosebatch")
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Hostels',
            action: () => deleteHandler(currentUser._id, "Hostels")
        }
    ];

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {response ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/hostels/choosebatch")}>
                                Add Hostels
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(hostelsList) && hostelsList.length > 0 &&
                                <TableTemplate buttonHaver={HostelsButtonHaver} columns={hostelColumns} rows={hostelRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    }
                </>
            }
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />

        </>
    );
};

export default ShowHostels;