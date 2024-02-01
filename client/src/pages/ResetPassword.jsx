// import styled from "styled-components";
// import { Mint } from "../asset";
import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { getResetPassword, postBackForgotPassword } from "../api/userApi";
import React from 'react';
// import { SignUpContainer, Contain, Title, SignUpForm, SignUpInput, SignUpButton, Option, SelectOption, ImgmintContainer, Img1, ImageContainer, Image, TextContainer, Label, BottomText, CopyRight } from './RegisterCSS';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Mint } from '../asset';
import { useTranslation } from "react-i18next";




import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Input, Label, Contain, Container, ImgmintContainer, Title, Img1 } from "./Register/RegisterCSS";
import { useNavigate } from 'react-router-dom'
const ResetButton = styled.button`
  background-color: #164e62;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  background-color: #fff;
  box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
 -webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
 -moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  margin: 5rem 0 3rem 0;

  @media screen and (max-width:768px) {
    width: 92%;
  }

`
const Form = styled.form`
   display:flex;
   justify-content: center;
   align-items:center;
   flex-direction: column;
   width: 500px;
   height: 70%;
  
   position: relative;
   padding: 2rem;
   margin: 2rem 0;

  @media screen and (max-width: 425px) {
   width: 100%;
   padding: 1rem;
  }
@media screen and (max-width: 768px) {
    width: 90%;
}
`

const ResetPassword = () => {
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { id, token } = useParams();
  const navigate = useNavigate()
  const {t}=useTranslation('global')
  console.log(newpassword);
  console.log(confirmpassword);
  //console.log(id)

  useEffect(() => {
    getResetPassword(id, token)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, [id, token]);

  const handleClick = (e) => {
    setError(false);
    setSuccess(false);
    e.preventDefault();
    if (newpassword !== confirmpassword) {
      setError(true);
    } else {
      setSuccess(true);
      postBackForgotPassword(id, token, newpassword)
        .then((data) => {
          console.log(data);
          setNewPassword("");
          setConfirmPassword("");
          navigate('/login');
        })
        .catch((err) => console.log(err));
    }

  };
  return (

    <Container>
      <Wrapper>

        <ImgmintContainer>
          <Img1 src={Mint} />
        </ImgmintContainer>

        <Title>
        {t("ResetPassword.reset")}
        </Title>
        <Form onSubmit={handleClick}>
          <Contain>
            <Label>{t("ResetPassword.enterPassword")}</Label>
            <Input
              type="password"
              placeholder={t("ResetPassword.newPassword")}
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Contain>

          <Contain>
            <Label>{t("ResetPassword.confirmPassword")}</Label>
            <Input
              type="password"
              placeholder="confirm password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Contain>
          <ResetButton type="submit">{t("ResetPassword.resetPassword")}</ResetButton>
        </Form>

</Wrapper>
       
     
      <Dialog
        open={success}
        onClose={() => setSuccess(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">{t("ResetPassword.success")}</DialogTitle>
        <DialogContent id="dialog-description">
          <DialogContentText>
            {t("ResetPassword.congrats")}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setSuccess(false)} color="primary">
            {t("ResetPassword.close")}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={error}
        onClose={() => setError(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">{t("ResetPassword.passwordConfirm")}</DialogTitle>
        <DialogContent id="dialog-description">
          <DialogContentText>{t("ResetPassword.noMatch")}</DialogContentText>

          <Contain>
            <Label>{t("ResetPassword.passwordConfirm")}</Label>
            <Input
              type="password"
              placeholder={t("ResetPassword.passwordConfirm")}
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Contain>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setError(false)} color="primary">
            {t("ResetPassword.close")}
          </Button>
          <Button onClick={handleClick} color="primary">
            {t("ResetPassword.submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>

  );
};

export default ResetPassword;
