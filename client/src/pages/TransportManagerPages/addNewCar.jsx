import React, { useState } from "react";
import styled from "styled-components";
import { Label, Input, Title, Contain, FormContainer } from "../Register/RegisterCSS";
//import CustomModal from '../components/Modal'
//import Navbar from '../components/Navbar'
import { addCar } from "../../api/userApi";


import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { SubmitButton } from "../../components/Buttons";

const Container = styled.div`
  width: 100%;
  padding: 20px 10px;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #fff;
  padding: 10px 20px;
  `;

const ButtonBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;
// const SubmitButton = styled.button`
//   width: 200px;
//   padding: 10px 20px;
//   font-size: 16px;
//   margin: 20px;
//   background-color: #155c68;
//   color: #fff;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   &:hover {
//     background-color: #3b808c;
//     color: #ee8624;
//   }
// `;


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
  const [error, setError] = useState('')
  const handleClick = () => {
    addCar({
      brand,
      model,
      licencePlateNumber,
      DriverName,
      driverDate,
      DriverPhoneNumber,
      owned,
    })
      .then(() => {
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
          <FormContainer>
            <Contain>
              <Label>{t('AddnewCar.brandName')}</Label>
              <Input
                type="text"
                placeholder="brand name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Contain>
            <Contain>
              <Label>{t('AddnewCar.modelName')}</Label>
              <Input
                type="text"
                placeholder="model name"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </Contain>

            <Contain>
              <Label>{t('AddnewCar.licencePlateNo')}</Label>
              <Input
                type="text"
                placeholder="licence plate number"
                value={licencePlateNumber}
                onChange={(e) => setLicencePlateNumber(e.target.value)}
              />
            </Contain>
            <Contain>
              <Label>{t('AddnewCar.RegisteredDate')}</Label>
              <Input
                type="date"
                value={driverDate}
                onChange={(e) => setDriverDate(e.target.value)}
              />
            </Contain>
            <Contain>
              <Label>{t("AddnewCar.Driver'sName")}</Label>
              <Input
                type="text"
                placeholder="driver name"
                value={DriverName}
                onChange={(e) => setDriverName(e.target.value)}
              />
            </Contain>
            <Contain>
              <Label>{t("AddnewCar.Driver'sPhoneNumber")}</Label>
              <Input
                type="tel"
                placeholder="phone number"
                value={DriverPhoneNumber}
                onChange={(e) => setDriverPhoneNumber(e.target.value)}
              />
            </Contain>
            <Contain>
              <Label>{t("AddnewCar.Owned")}</Label>
              <Select onChange={(e) => setOwned(e.target.value)}>
                <Option value={"rent"}>{t("AddnewCar.rent")}</Option>
                <Option value={"own"}>{t("AddnewCar.own")}</Option>
              </Select>
            </Contain>
          </FormContainer>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <ButtonBox>
            <SubmitButton handleForm={() => setIsOpen(true)} title={t("AddnewCar.submit")} />
          </ButtonBox>
          <ConfirmDialog isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={handleClick} />
        </Wrapper>
      </Container>
    </>
  );
};

const ConfirmDialog = ({ isOpen, setIsOpen, onSubmit }) => {
  return <Dialog
    open={isOpen}
    onClose={() => setIsOpen(false)}
    aria-labelledby="dialog-title"
    aria-describedby="dialog-description"
  >
    <DialogTitle id="dialog-title">
      Confirmation message
    </DialogTitle>
    <DialogContent id="dialog-description">
      <DialogContentText>Are you sure you want to add this car ?</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setIsOpen(false)} style={{ backgroundColor: "#f5f5f5", color: "gray" }}>Cancel</Button>
      <Button
        style={{ backgroundColor: "#ee8624", color: "white" }}
        autoFocus
        onClick={() => {
          onSubmit();
          setIsOpen(false);
        }}
      >
        Submit
      </Button>
    </DialogActions>
  </Dialog>
}
export default AddNewCar;
