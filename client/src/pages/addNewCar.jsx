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
import { useTranslation } from "react-i18next";

const Container = styled.div`
  width: 100%;
  padding: 20px 10px;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background: #fff;
  padding: 10px 20px;
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
 
  const { t } = useTranslation('global')
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [owned, setOwned] = useState("");
  const [licencePlateNumber, setLicencePlateNumber] = useState("");
  const [DriverName, setDriverName] = useState("");
  const [driverDate, setDriverDate] = useState("");
  const [DriverPhoneNumber, setDriverPhoneNumber] = useState("");
  const [error,setError]=useState('')
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
      .then(() =>{
        setBrand('');
        setModel('');
        setOwned('');
        setLicencePlateNumber('')
        setDriverName('');
        setDriverDate('');
        setDriverPhoneNumber('');
        setError('');
      })
      .catch((error) => {
        if (error.response) {
          console.log(error)
        setError(error.response.data.message);
      } else {
        // Handle network errors or other exceptions
        console.log('Error:', error);
      }
      });
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Container>
        <Wrapper>
          <Title>{t('AddnewCar.title')}</Title>

          <FormBox>
            <InputItem>
              <Label>{t('AddnewCar.brandName')}</Label>
              <SignUpInput
                type="text"
                placeholder="brand name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </InputItem>
            <InputItem>
              <Label>{t('AddnewCar.modelName')}</Label>
              <SignUpInput
                type="text"
                placeholder="model name"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </InputItem>

            <InputItem>
              <Label>{t('AddnewCar.licencePlateNo')}</Label>
              <SignUpInput
                type="text"
                placeholder="licence plate number"
                value={licencePlateNumber}
                onChange={(e) => setLicencePlateNumber(e.target.value)}
              />
            </InputItem>
            <InputItem>
              <Label>{t('AddnewCar.RegisteredDate')}</Label>
              <SignUpInput
                type="date"
                value={driverDate}
                onChange={(e) => setDriverDate(e.target.value)}
              />
            </InputItem>
            <InputItem>
              <Label>{t("AddnewCar.Driver'sName")}</Label>
              <SignUpInput
                type="text"
                placeholder="driver name"
                value={DriverName}
                onChange={(e) => setDriverName(e.target.value)}
              />
            </InputItem>
            <InputItem>
              <Label>{t("AddnewCar.Driver'sPhoneNumber")}</Label>
              <SignUpInput
                type="tel"
                placeholder="phone number"
                value={DriverPhoneNumber}
                onChange={(e) => setDriverPhoneNumber(e.target.value)}
              />
            </InputItem>
            <InputItem>
              <Label>{t("AddnewCar.Owned")}</Label>
              <Select onChange={(e) => setOwned(e.target.value)}>
                <Option value={"rent"}>{t("AddnewCar.rent")}</Option>
                <Option value={"own"}>{t("AddnewCar.own")}</Option>
              </Select>
            </InputItem>
          </FormBox>
          {error && <p style={{color:"red"}}>{error}</p>}
          <ButtonBox>
            <SubmitButton onClick={() => setIsOpen(true)}>{t("AddnewCar.submit")}</SubmitButton>
          </ButtonBox>

          
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
          >
            <DialogTitle id="dialog-title">
              Add the New car to the database?
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
