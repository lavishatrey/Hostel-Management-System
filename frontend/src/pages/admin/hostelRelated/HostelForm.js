import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from '../../../components/Popup';

const HostelForm = () => {
    const [hostels, setHostels] = useState([{ subName: "", subCode: "", sessions: "" }]);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;

    const batchName = params.id
    const adminID = currentUser._id
    const address = "Hostel"

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    const handleHostelNameChange = (index) => (event) => {
        const newHostels = [...hostels];
        newHostels[index].subName = event.target.value;
        setHostels(newHostels);
    };

    const handleHostelCodeChange = (index) => (event) => {
        const newHostels = [...hostels];
        newHostels[index].subCode = event.target.value;
        setHostels(newHostels);
    };

    const handleSessionsChange = (index) => (event) => {
        const newHostels = [...hostels];
        newHostels[index].sessions = event.target.value || 0;
        setHostels(newHostels);
    };

    const handleAddHostel = () => {
        setHostels([...hostels, { subName: "", subCode: "" }]);
    };

    const handleRemoveHostel = (index) => () => {
        const newHostels = [...hostels];
        newHostels.splice(index, 1);
        setHostels(newHostels);
    };

    const fields = {
        batchName,
        hostels: hostels.map((hostel) => ({
            subName: hostel.subName,
            subCode: hostel.subCode,
            sessions: hostel.sessions,
        })),
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === 'added') {
            navigate("/Admin/hostels");
            dispatch(underControl())
            setLoader(false)
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <form onSubmit={submitHandler}>
            <Box mb={2}>
                <Typography variant="h6" >Add Hostels</Typography>
            </Box>
            <Grid container spacing={2}>
                {hostels.map((hostel, index) => (
                    <React.Fragment key={index}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Hostel Name"
                                variant="outlined"
                                value={hostel.subName}
                                onChange={handleHostelNameChange(index)}
                                sx={styles.inputField}
                                required
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Hostel Code"
                                variant="outlined"
                                value={hostel.subCode}
                                onChange={handleHostelCodeChange(index)}
                                sx={styles.inputField}
                                required
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Sessions"
                                variant="outlined"
                                type="number"
                                inputProps={{ min: 0 }}
                                value={hostel.sessions}
                                onChange={handleSessionsChange(index)}
                                sx={styles.inputField}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Box display="flex" alignItems="flex-end">
                                {index === 0 ? (
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleAddHostel}
                                    >
                                        Add Hostel
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={handleRemoveHostel(index)}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </Box>
                        </Grid>
                    </React.Fragment>
                ))}
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="primary" type="submit" disabled={loader}>
                            {loader ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Save'
                            )}
                        </Button>
                    </Box>
                </Grid>
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </Grid>
        </form>
    );
}

export default HostelForm

const styles = {
    inputField: {
        '& .MuiInputLabel-root': {
            color: '#838080',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#838080',
        },
    },
};