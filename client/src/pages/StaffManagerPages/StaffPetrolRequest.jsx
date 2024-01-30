import React, { useState } from "react";
import styled from 'styled-components';
import { Contain, Input, Label } from '../Register/RegisterCSS';


const Container = styled.div`
  width: 100%;
  padding: 20px 10px;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  padding: 20px;
 
`;

const FormBox = styled.form`
  display: flex;

  flex-direction:column;
`;

const InputItem = styled.div`
   display:flex;
  text-align:left;
  padding:0;
  flex-direction:column;
  margin-top: 10px;
  margin-right: 20px;
  width: 400px;
`;


const Title = styled.h1`

`

const TextArea = styled.textarea`
  // margin-top:10px;
  min-width: 400px;
  border-radius:6px;
  padding: 10px;
  border: 1px solid #ccc;
  width: 100%;
 //box-shadow: 2px 2px 5px grey;
`
const Submit = styled.button`
  transition: all .3s ease-in-out;
  border-radius:10px;
  width:200px;
  color:white;
  height:40px;
  font-weight: 400;
  font-size:18px;
  cursor:pointer;
  background-color: rgb(255, 165, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  /* box-shadow:0 0 5px yellow,
          0 0 25px yellow; */
  &:hover{
    font-size:18px;
    box-shadow: 0px 0px 18px 0px rgba(255, 165, 0, 0.75);
-webkit-box-shadow: 0px 0px 18px 0px rgba(255, 165, 0, 0.75);
-moz-box-shadow: 0px 0px 18px 0px rgba(255, 165, 0, 0.75);
  }
`

const StaffPetrolRequest = () => {
  const [requestDate, setRequestDate] = useState('')
  const [discription, setDiscription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

  }

  return (
    <Container>
      <Wrapper>
        <Title>Petrol Request Form</Title>
        <FormBox onSubmit={handleSubmit}>
          <Contain>
            <Label>Request date</Label>
            <Input
              placeholder="request date"
              type="date"
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
            />
          </Contain>
          <Contain>
            <Label>Description</Label>
            <TextArea
              placeholder="Discription"
              value={requestDate}
              onChange={(e) => setRequestDate(e.target.value)}
              rows={4}
            />
          </Contain>
          <Submit>Submit</Submit>
        </FormBox>
      </Wrapper>
    </Container>

  )
}

export default StaffPetrolRequest