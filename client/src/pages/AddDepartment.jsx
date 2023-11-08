import React from 'react';
import styled from 'styled-components';

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

const Button = styled.button`
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
  

  return (
    <MainContainer>
      <ThirdContainer>
        <h2>Department Information</h2>
        <InputContainer>
          <div>
            <label>Department Name</label>
            <InputField type="text" placeholder="Enter department name" />

            <label>Staff Manager</label>
            <InputField type="text" placeholder="Enter staff manager" />
          </div>
        </InputContainer>

        <div>
          <Button >Submit</Button>
          <CancelButton >Cancel</CancelButton>
        </div>
      </ThirdContainer>
    </MainContainer>
  );
};

export default AddDepartment;
