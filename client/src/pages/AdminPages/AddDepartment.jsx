import React from 'react';
import styled from 'styled-components';
import { useState } from 'react'
import { addDept } from '../../api/userApi'


import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";


const MainContainer = styled.div`
  background-color: #f0f0f0; 
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
`;

const ThirdContainer = styled.div`
  background-color: white;
  width: 80%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%; 
  padding: 20px; 
  border: 1px solid #e0e0e0; 
  border-radius: 5px; 
  background-color: #f9f9f9; 
`;


const InputField = styled.input`
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc; 
  border-radius: 5px;
`;


const Buttonn = styled.button`
  padding: 10px 20px;
  background-color: #164E62;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #123845; 
  }
`;

const CancelButton = styled(Button)`
  background-color: #e74c3c; 
  margin-left: 10px; 
`;


const AddDepartment = () => {
  const [deptName, setDeptName] = useState('')
  const [staffManager, setStaffManager] = useState('')
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState('');
  const handleClick = () => {


    console.log(deptName)
    console.log(staffManager)
    addDept({ deptName, staffManager }).then(() => {
      setDeptName('')
      setStaffManager('')
      setError('')
    }).catch((error) => {
      if (error.response) {
        console.log(error)
        setError(error.response.data.message);
      } else {
        // Handle network errors or other exceptions
        console.log('Error:', error);
      }
    })
  }


  return (
    <MainContainer>
      <ThirdContainer>
        <h2>Department Information</h2>
        <InputContainer>
          <div>
            <label>Department Name</label>
            <InputField
              type="text"
              placeholder="Enter department name"
              value={deptName}
              onChange={(e) => setDeptName(e.target.value)}
            />

            <label>Staff Manager</label>
            <InputField
              type="text"
              placeholder="Enter staff manager"
              value={staffManager}
              onChange={(e) => setStaffManager(e.target.value)}
            />
          </div>
        </InputContainer>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <Buttonn onClick={() => setIsOpen(true)}>Submit</Buttonn>

        </div>
      </ThirdContainer>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">
          Add the New department to the database?
        </DialogTitle>
        <DialogContent id="dialog-description">
          <DialogContentText>Are you sure?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} style={{ backgroundColor: "Red", color: "white" }}>Cancel</Button>
          <Button
            style={{ backgroundColor: "Yellow", color: "white" }}
            autoFocus
            onClick={() => {
              handleClick();
              setIsOpen(false);
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

    </MainContainer>
  );
};

export default AddDepartment;