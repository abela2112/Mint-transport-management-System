import React, { useState } from 'react';
import { SignUpContainer,Contain, Header,SignUpForm, SignUpInput, SignUpButton , Option,SelectOption, ImageContainer, Image, TextContainer, Label, BottomText} from './RegisterCSS';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    console.log('Sign up button clicked');
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Position:', position);
    console.log('Password:', password);
  };

  return (
    
    <SignUpContainer>
      <TextContainer>
        <Header>
          <h1>Get Started Now</h1>
        </Header>
      <SignUpForm>
        <Contain>
        <Label>First Name</Label>
        <SignUpInput
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          />
          </Contain>
          <Contain>

        <Label>Last Name</Label>
        <SignUpInput
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          />
          </Contain>
          <Contain>
        <Label>Email</Label>
        <SignUpInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          </Contain>
          <Contain>

          <Label>Department</Label>
         <SelectOption>
                 <Option disabled selected>Select Option</Option>
                  <Option>aaaa</Option>
                  <Option>bbbb</Option>
                  <Option>cccc</Option>
         </SelectOption>
          </Contain>
          <Contain>

          <Label>Position</Label>
         <SelectOption>
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
          />
          </Contain>
        
      <SignUpButton onClick={handleSignUp}>Sign Up</SignUpButton>
      <BottomText>
       <p>Or</p>
      <p>Already have an account? <span style={{color:'blue'}}>Sign in</span>  </p>
      </BottomText>
      
      </SignUpForm>
    </TextContainer>

    <ImageContainer>
      <Image src='https://borkena.com/wp-content/uploads/2019/05/Innovation-and-Technology-_-e-governance_.jpg' />
    </ImageContainer>
    

    </SignUpContainer>
    
  );
};

export default SignUpPage;