import React from 'react'
import styled from 'styled-components'
import { Label, SignUpInput, Title } from './Register/RegisterCSS'
import Navbar from '../components/Navbar'
const Container = styled.div`
width: 100%;
padding: 20px;

`
const Wrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;

`

const FormBox = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const InputItem = styled.div`
display: flex;
flex-direction: column;
width: 400px;
margin-top:10px ;
margin-right: 20px;
`
const ButtonBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const SubmitButton = styled.button`
width: 200px;
  padding:10px 20px;
  font-size: 16px;
  margin: 20px;
  background-color: #155c68;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover{
    background-color: #3b808c;
  }

`
const CancelButton = styled.button`
width: 200px;
  padding:10px 20px;
  font-size: 16px;
  margin: 20px;
  background-color: #828788;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
`

const Select = styled.select`
width: 100%;
padding: 10px;
border: 1px solid #ccc;
  border-radius: 5px;
`

const Option = styled.option`
    padding: 5px;
`
const AddNewCar = () => {
    return (
        <>
            <Navbar title={'Add New Car'} />
            <Container>
                <Wrapper>
                    {/* <Title>Add new Car</Title> */}

                    <FormBox>
                        <InputItem>
                            <Label>Brand name</Label>
                            <SignUpInput type='text' placeholder='brand name' />
                        </InputItem>
                        <InputItem>
                            <Label>Model name</Label>
                            <SignUpInput type='text' placeholder='model name' />
                        </InputItem>

                        <InputItem>
                            <Label>Licence plate No</Label>
                            <SignUpInput type='text' placeholder='licence plate number' />
                        </InputItem>
                        <InputItem>
                            <Label>Registered date</Label>
                            <SignUpInput type='date' />
                        </InputItem>
                        <InputItem>
                            <Label>Driver's Name</Label>
                            <SignUpInput type='text' placeholder='brand name' />
                        </InputItem>
                        <InputItem>
                            <Label>Driver's Phone Number</Label>
                            <SignUpInput type='tel' placeholder='phone number' />
                        </InputItem>
                        <InputItem>
                            <Label>Owned</Label>
                            <Select>
                                <Option>rent</Option>
                                <Option>own</Option>
                            </Select>
                        </InputItem>
                    </FormBox>

                    <ButtonBox>
                        <CancelButton>cancel</CancelButton>
                        <SubmitButton>submit</SubmitButton>

                    </ButtonBox>
                </Wrapper>
            </Container></>
    )
}

export default AddNewCar