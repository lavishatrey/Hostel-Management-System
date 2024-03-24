import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getHostelDetails } from '../../../redux/batchRelated/batchHandle';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress } from '@mui/material';

const AddWarden = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const hostelID = params.id

  const { status, response, error } = useSelector(state => state.user);
  const { hostelDetails } = useSelector((state) => state.batch);

  useEffect(() => {
    dispatch(getHostelDetails(hostelID, "Hostel"));
  }, [dispatch, hostelID]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false)

  const role = "Warden"
  const college = hostelDetails && hostelDetails.college
  const teachHostel = hostelDetails && hostelDetails._id
  const teachBatch = hostelDetails && hostelDetails.batchName && hostelDetails.batchName._id

  const fields = { name, email, password, role, college, teachHostel, teachBatch }

  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    dispatch(registerUser(fields, role))
  }

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl())
      navigate("/Admin/wardens")
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
    <div>
      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle">Add Warden</span>
          <br />
          <label>
            Hostel : {hostelDetails && hostelDetails.subName}
          </label>
          <label>
            Batch : {hostelDetails && hostelDetails.batchName && hostelDetails.batchName.batchName}
          </label>
          <label>Name</label>
          <input className="registerInput" type="text" placeholder="Enter warden's name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name" required />

          <label>Email</label>
          <input className="registerInput" type="email" placeholder="Enter warden's email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email" required />

          <label>Password</label>
          <input className="registerInput" type="password" placeholder="Enter warden's password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password" required />

          <button className="registerButton" type="submit" disabled={loader}>
            {loader ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Register'
            )}
          </button>
        </form>
      </div>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  )
}

export default AddWarden