import React, { useState } from "react";
import styled from "styled-components";
import { Label, SignUpInput, Title } from "./Register/RegisterCSS";
//import CustomModal from '../components/Modal'
//import Navbar from '../components/Navbar'
import { addCar } from "../api/userApi";


import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const Container = styled.div`
  width: 100%;
  padding: 20px 10px;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FormBox = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const InputItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-top: 10px;
  margin-right: 20px;
`;
const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const SubmitButton = styled.button`
  width: 200px;
  padding: 10px 20px;
  font-size: 16px;
  margin: 20px;
  background-color: #155c68;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #3b808c;
    color: #ee8624;
  }
`;


const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Option = styled.option`
  padding: 5px;
`;
const AddNewCar = () => {
 

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [owned, setOwned] = useState("");
  const [licencePlateNumber, setLicencePlateNumber] = useState("");
  const [DriverName, setDriverName] = useState("");
  const [driverDate, setDriverDate] = useState("");
  const [DriverPhoneNumber, setDriverPhoneNumber] = useState("");

  const handleClick = () => {
    console.log("brand:", brand);
    console.log("model:", model);
    console.log("owned:", owned);
    console.log("licencePlateNumber:", licencePlateNumber);
    console.log("driverName:", DriverName);
    console.log("driverDate:", driverDate);
    console.log("driverPhoneNumber:", DriverPhoneNumber);
    addCar({
      brand,
      model,
      licencePlateNumber,
      DriverName,
      driverDate,
      DriverPhoneNumber,
      owned,
    })
      .then(() => console.log("car successfully registered"))
      .catch((err) => console.log(err));
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Container>
        <Wrapper>
          <Title>Add new Car</Title>

          <FormBox>
            <InputItem>
              <Label>Brand name</Label>
              <SignUpInput
                type="text"
                placeholder="brand name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </InputItem>
            <InputItem>
              <Label>Model name</Label>
              <SignUpInput
                type="text"
                placeholder="model name"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </InputItem>

            <InputItem>
              <Label>Licence plate No</Label>
              <SignUpInput
                type="text"
                placeholder="licence plate number"
                value={licencePlateNumber}
                onChange={(e) => setLicencePlateNumber(e.target.value)}
              />
            </InputItem>
            <InputItem>
              <Label>Registered date</Label>
              <SignUpInput
                type="date"
                value={driverDate}
                onChange={(e) => setDriverDate(e.target.value)}
              />
            </InputItem>
            <InputItem>
              <Label>Driver's Name</Label>
              <SignUpInput
                type="text"
                placeholder="driver name"
                value={DriverName}
                onChange={(e) => setDriverName(e.target.value)}
              />
            </InputItem>
            <InputItem>
              <Label>Driver's Phone Number</Label>
              <SignUpInput
                type="tel"
                placeholder="phone number"
                value={DriverPhoneNumber}
                onChange={(e) => setDriverPhoneNumber(e.target.value)}
              />
            </InputItem>
            <InputItem>
              <Label>Owned</Label>
              <Select onChange={(e) => setOwned(e.target.value)}>
                <Option value={"rent"}>rent</Option>
                <Option value={"own"}>own</Option>
              </Select>
            </InputItem>
          </FormBox>

          <ButtonBox>
            <SubmitButton onClick={() => setIsOpen(true)}>submit</SubmitButton>
          </ButtonBox>

          
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
          >
            <DialogTitle id="dialog-title">
              Add the New data to the database?
            </DialogTitle>
            <DialogContent id="dialog-description">
              <DialogContentText>Are you sure?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsOpen(false)} style={{backgroundColor:"Red",color:"white"}}>Cancel</Button>
              <Button
                style={{backgroundColor:"Yellow",color:"white"}}
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
        </Wrapper>
      </Container>
    </>
  );
};

export default AddNewCar;
