import React, { useEffect, useState } from 'react';
import { SignUpContainer, Contain, Title, SignUpForm, SignUpInput, SignUpButton, Option, SelectOption, ImgmintContainer, Img1, ImageContainer, Image, TextContainer, Label, BottomText, CopyRight } from './RegisterCSS';
import { Link } from 'react-router-dom';
import { Background, Mint } from '../../asset';
import { signUp } from '../../api/userApi';
import {getAllDepartment} from  '../../api/userApi'

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { io } from 'socket.io-client';


const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber,setPhoneNumber]=useState('');
  const [position, setPosition] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  //const [gender, setGender] = useState('male');
  const [confirmPassword, setConfirmPassword]=useState('')
  const [error, setError] = useState('');
  const [deptArray,setDeptArray]=useState([])
  
  const [isLoading, setIsLoading] = useState(false)
  const socket = io("http://localhost:5000");



  const handleSignUp = (e) => {
    e.preventDefault()
  
    setError('');
    console.log('Sign up button clicked');
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Position:', position);
    console.log('Password:', password);
    console.log('phoneNumber:',phoneNumber)
    console.log('department:', department);
    
      // Make the API request to your backend using Axios
    setIsLoading(true)
      signUp({ firstName, lastName, email, position, department, password, phoneNumber })
      .then(({data}) => { 
        setIsOpen(true);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setPosition('');
        setPassword('');
        setDepartment('');
        setConfirmPassword('');
        setError('');
        setIsLoading(false);
          console.log('Successfully registered', data);
          socket.emit('sendNotificationToAdmin', { notificationType: "user-register-request", messageId: data.user?._id, message: 'new user register request', from: data.user?._id });
      }).catch((error) => {
        if (error.response) {
          console.log(error)
          setIsLoading(false)
        setError(error.response.data.message);
      } else {
        // Handle network errors or other exceptions
        console.log('Error:', error);
      }
    }
  )
    
      // Success, perform further actions or submit the form
  } 

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setError('')
    }, 5000)
  }, [])
  useEffect(()=>{
       getAllDepartment().then(({data})=>setDeptArray(data)).catch((error)=>console.log(error))
      
  },[])

  return (

    <SignUpContainer>
     
      <TextContainer>
        <ImgmintContainer>
          <Img1 src={Mint} />
        </ImgmintContainer>

        <Title>
         Get Start Now 
        </Title>
        <SignUpForm onSubmit={handleSignUp}>
          <Contain>
            <Label>First Name</Label>
            <SignUpInput
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              title="Enter your First name"
            />
          </Contain>
          <Contain>

            <Label>Last Name</Label>
            <SignUpInput
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              title="Enter your last name"
            />
          </Contain>
          <Contain>
            <Label>Email</Label>
            <SignUpInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              title="Enter your organization email like firstName.lastName@mint.gov.et"
            />
          </Contain>
          <Contain>

            <Label>Department</Label>
            {/* <SelectOption title="select your department" onChange={(e) => setDepartment(e.target.value)}>
              <Option disabled selected>Select Option</Option>
             
              <Option>bbbb</Option>
              <Option>cccc</Option>
            </SelectOption> */}
            <SelectOption
title="select your department"
placeholder="department"
value={department}
onChange={(e) => setDepartment(e.target.value)}
>
{deptArray.map((dept, i) => (
    <Option key={i} value={dept?.deptName} >{dept?.deptName} </Option>
))}
</SelectOption>
          </Contain>

          <Contain>
             
            <Label>Position</Label>
            <SelectOption title="select your position" onChange={(e) => setPosition(e.target.value)}>
              <Option disabled selected>Select Option</Option>
              <Option>CEO</Option>
              <Option>Desk</Option>
              <Option>Expert</Option>
            </SelectOption>
          </Contain>

          <Contain>
          
            <Label>Password</Label>
            <SignUpInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              title="Your password must containe al-least one number one special character and one letter"
            />
          </Contain>
          <Contain>
          
            <Label>Phone</Label>
            <SignUpInput
              type="tel"
              placeholder="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              title="Your phone number must be 10 digit number"
            />
          </Contain>
          {/* <Contain>

            <Label>Gender</Label>
            <div>
              <input style={{margin:'0 10px'}} type='radio' name='gender' value='male' id='male' checked={gender==='male'} onChange={(e)=>setGender(e.target.value)}/>
              <Label htmlFor='male'>Male</Label>

              <input  style={{margin:'0 10px'}}  type='radio' name='gender' value='female' id='female' checked={gender==='female'} onChange={(e)=>setGender(e.target.value)}/>
              <Label htmlFor='female'>Female</Label>
            </div>
          </Contain>
           */}

          <Contain>

            <Label>Confirm Password</Label>
            <SignUpInput
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              title="confirm password must be the same as the main password"
            />
          </Contain>

          <BottomText>

            <p>Already have an account? <Link className='link' to={'/login'} style={{ color: '#e6953b' }}>Sign in</Link>  </p>
          </BottomText>
          <SignUpButton disabled={isLoading} onClick={() => (password !== confirmPassword) ? setIsOpen(true) : setIsOpen(false)} >Sign up</SignUpButton>
       
        </SignUpForm>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
        >
          <DialogTitle id="dialog-title">
            {password !== confirmPassword ? "Confirm Password" : "Registration Successful"}
          </DialogTitle>
          <DialogContent id="dialog-description">
            {password !== confirmPassword ? (
              <DialogContentText>Password doesn't match! Please confirm again</DialogContentText>
            ) : (
                <DialogContentText>Congratulations! You have successfully registered check your admin for approval</DialogContentText>
            )}
            {password !== confirmPassword && (
              <Contain>
                <Label>Confirm Password</Label>
                <SignUpInput
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Contain>
            )}
          </DialogContent>
          <DialogActions>
            {password !== confirmPassword ? (
              <>
                <Button onClick={() => setIsOpen(false)} style={{ backgroundColor: "Red", color: "white" }}>
                  Cancel
                </Button>
                <Button
                  style={{ backgroundColor: "Yellow", color: "white" }}
                  autoFocus
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Submit
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsOpen(false)} color="primary">
                Close
              </Button>
            )}
          </DialogActions>
        </Dialog>
       
      </TextContainer>
      <CopyRight>
        <small>mint&copy;2023 All right reserved</small>
      </CopyRight>
      
    </SignUpContainer>

  );
};

export default Register;
//https://borkena.com/wp-content/uploads/2019/05/Innovation-and-Technology-_-e-governance_.jpg
