import React, { useState } from 'react'
import styled from 'styled-components'
import { Label, SignUpInput, Title } from './Register/RegisterCSS'
import Navbar from '../components/Navbar'
import { addDriver } from '../api/userApi'
import DialogModal from '../components/DialogModal'

const Container = styled.div `
width: 100%;
padding: 20px;

`

const Wrapper = styled.div `
display: flex;
flex-direction: column;

justify-content: space-between;
`

const FormBox = styled.form`
    display: flex;
    flex-direction: column; 
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
    align-item9s: center;
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
const AddNewDriver = () => {

       const [name,setName]=useState("")
       const [phoneNumber,setPhoneNumber]=useState("")
       const [registeredDate,setRegisteredDate]=useState("")
       const [error,setError]=useState('')


       const handleClick=(e)=>{
        
            console.log("name" ,name);
            console.log("phone" ,phoneNumber);
            console.log("regDate",registeredDate);
            addDriver({name,phoneNumber,registeredDate}).then(()=>{setPhoneNumber(''); setName('');  setRegisteredDate(''); setError('')}).catch((error)=>{
                if (error.response) {
                    console.log(error)
                  setError(error.response.data.message);
                } else {
                  // Handle network errors or other exceptions
                  console.log('Error:', error);
                }
            })
       }
       
       
       const [isModalOpen, setIsModalOpen] = useState(false);
      
       const handleButtonClick = () => {
           
         setIsModalOpen(true);
       };



    return (
        <>

            <Container>
                <Wrapper>
                    {/* <Title>Add new Car</Title> */}

                    <FormBox>
                        <InputItem>
                            <Label>name</Label>
                            <SignUpInput 
                            type='text' 
                            placeholder='full name'
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            />
                        </InputItem>
                        <InputItem>
                            <Label>Phone Number</Label>
                            <SignUpInput 
                            type='tel' 
                            placeholder='phone number' 
                            value={phoneNumber}
                            onChange={(e)=>setPhoneNumber(e.target.value)}
                            />
                        </InputItem>


                        <InputItem>
                            <Label>Registered date</Label>
                            <SignUpInput 
                            type='date'
                            value={registeredDate}
                            onChange={(e)=>setRegisteredDate(e.target.value)}
                            />
                        </InputItem>

                    </FormBox>
                    {error && <p style={{color:"red"}}>{error}</p>}
                    <ButtonBox>

                       <SubmitButton onClick={handleButtonClick}>submit</SubmitButton>
                        <DialogModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleClick}/>

                    </ButtonBox>
                </Wrapper>
            </Container></>
    )
}

export default AddNewDriver