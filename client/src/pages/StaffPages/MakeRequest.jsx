import { AddSharp } from '@mui/icons-material';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import { createRequest } from '../../api/userApi';
import { CancelButton, SubmitButton } from '../../components/Buttons';
import DialogModal from '../../components/DialogModal';
import ErrorMessage from '../../components/ErrorMessage';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
   `

const Wrraper = styled.div`
 width:80%;
 background: #fff;
 padding: 20px;
 border-radius: 10px;
//  flex-wrap:wrap;
   
   @media screen and (max-width:768px) {
    width: 100%;
    padding: 10px;
   }
`

const Form = styled.form`
display:flex;
justify-content:start;
align-items:start;
flex-wrap:wrap;
// width: 75%;
`
const Title = styled.h1`
font-size:24px;
font-weight:500;
`
const Input = styled.input`
flex:1;
padding :10px;
transition:transform 2s ease;
border-radius:5px;
width: 100%;
margin-bottom: 10px;
border: 1px solid #ccc;
 
// box-shadow: 1px 1px 5px grey;
 &:hover{
    transform: scaleX(1.025);
 }
`

const Label = styled.label`
  padding:10px;
`


const Div = styled.div`
  display:flex;
  flex-direction:column;
  margin-top: 10px;
  margin-right: 20px;
  width: 400px;
`
const PassangerDiv = styled.div`

  display:flex;
  align-items: center;
  margin-top: 10px;
  width: 100%;
`
const TextArea = styled.textarea`
flex:1;
padding :10px;
border-radius:5px;
width: 100%;
margin-bottom: 10px;
border: 1px solid #ccc;
 
`
const ButtonContainer = styled.div`
    display:flex;
    justify-content:flex-end;
    margin-top:3rem;
    align-items: center;
    gap: 1rem;
    width: 100%;

    @media screen and (max-width: 425px) {
     flex-direction:column ;
    }
`


const Addbutton = styled.button`
display: flex;
align-items: center;
padding: 0.5rem 0.75rem;
color: white;
background-color: rgb(21, 92, 104);
border-radius:10px;
margin-top: 1rem;
width:100%;
`
const Removebutton = styled.button`
font-size: 21px;
color: red;
margin-left: 20px;
background-color: white;
`


const MakeRequest = () => {
  const { user } = useSelector(state => state.user)

  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, },
  } = useForm();
  const { fields, append, prepend, remove, } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "passenger", // unique name for your Field Array
    rules: {
      required: "please enter a name"
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const socket = io("http://localhost:5000");

  return (
    <Container>
      <Wrraper>
        <Title>Request Form</Title>
        <Form onSubmit={handleSubmit(async (data) => {
          try {
            setIsLoading(true)
            await createRequest(data)
            socket.emit('sendNotificationToStaffmanager', { notificationType: "request", messageId: data?._id, message: 'new request', from: user?._id });
            toast.success("Successfully created request")
            setIsLoading(false);
            reset()
            console.log("Successfully created", data);
          } catch (error) {
            toast.error("Failed to create request!")
            setIsLoading(false);
          }
        })}>
          <Div>
            <Label>Full Name</Label>
            <Input placeholder="Full Name" defaultValue={`${user?.firstName} ${user?.lastName}`}  {...register('name', { disabled: true })} />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </Div>

          <Div>
            <Label>Phone No.</Label>
            <Input placeholder="Phone" type='tel'  {...register('phoneNumber', { required: "phone number is required" },)} />
            <ErrorMessage>{errors.phoneNumber && errors.phoneNumber.message}</ErrorMessage>
          </Div>
          <Div>
            <Label>PickUp date</Label>
            <Input placeholder="Pickup date" type='date' {...register('pickUpDate', {
              required: "Pick Up date is required",
              validate: (fieldvalue) => {
                const currentDate = new Date().getTime()
                const newDate = new Date(fieldvalue).getTime()

                if (newDate < currentDate) {
                  return "Pick Up date must be after current date"
                }
              }
            })} />

            <ErrorMessage>{errors.pickUpDate?.message}</ErrorMessage>
          </Div>
          <Div>
            <Label>Return date</Label>
            <Input placeholder="Return date" type='date'  {...register('returnDate', {
              required: "Return date is required.",
              validate: (fieldvalue) => {
                const currentDate = new Date().getTime()
                const newDate = new Date(fieldvalue).getTime()

                if (newDate < currentDate) {
                  return "Return date must be after current date"
                }
              }
            })} />
            <ErrorMessage>{errors.returnDate?.message}</ErrorMessage>
          </Div>
          <Div>
            <Label>Destination</Label>
            <Input placeholder="Destination"  {...register('destination', { required: "Destination is Required." })} />
            <ErrorMessage>{errors.destination?.message}</ErrorMessage>
          </Div>
          <Div>
            <Label>Discription</Label>
            <TextArea
              placeholder="Discription"
              {...register('description', { required: "Description is Required." })}
              rows={4}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
          </Div>
          <Div>

            <Label> Passangers</Label>
            {
              fields.map((field, index) => {
                return (
                  <PassangerDiv key={field.id} >
                    <Input
                      placeholder="Passanger Name"
                      {...register(`passenger.${index}.name`,)}
                      id={index}
                      type='text'
                      size="40"
                    />
                    {index !== 0 && <Removebutton id={index} onClick={() => remove(index)}>X</Removebutton>}
                  </PassangerDiv>
                );
              })
            }
            <Addbutton type='button' onClick={() => append({ value: '' })}> <AddSharp style={{ color: '#fff' }} /> Add Passenger </Addbutton>
          </Div>
          {/* <ErrorMessage>{errors.passenger && "Passenger is Required."}</ErrorMessage> */}
          <ButtonContainer>
            <CancelButton onClick={() => reset()} />
            <SubmitButton isLoading={isLoading} title={"Submit"} />
          </ButtonContainer>
        </Form>



      </Wrraper>
      <Toaster />
      <DialogModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />
    </Container>
  )


}
export default MakeRequest