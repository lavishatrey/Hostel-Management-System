import React from 'react'
import styled from 'styled-components';
import { Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const WardenProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const teachBatch = currentUser.teachBatch
  const teachHostel = currentUser.teachHostel
  const teachCollege = currentUser.college

  return (
    <>
      <ProfileCard>
        <ProfileCardContent>
          <ProfileText>Name: {currentUser.name}</ProfileText>
          <ProfileText>Email: {currentUser.email}</ProfileText>
          <ProfileText>Batch: {teachBatch.batchName}</ProfileText>
          <ProfileText>Hostel: {teachHostel.subName}</ProfileText>
          <ProfileText>College: {teachCollege.collegeName}</ProfileText>
        </ProfileCardContent>
      </ProfileCard>
    </>
  )
}

export default WardenProfile

const ProfileCard = styled(Card)`
  margin: 20px;
  width: 400px;
  border-radius: 10px;
`;

const ProfileCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileText = styled(Typography)`
  margin: 10px;
`;