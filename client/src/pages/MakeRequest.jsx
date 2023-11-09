import styled from 'styled-components'

import { createRequest } from '../api/userApi'
import { useState } from 'react'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'

import CustomModal from '../components/Modal'
import DialogModal from '../components/DialogModal'
import { useSelector } from 'react-redux'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // flex-direction:column;
   `

const Wrraper = styled.div`
display:flex;
flex-direction: column;
align-items: flex-start;
justify-content:center;
// //  padding :10px;
// //  margin-top:0px;
//  //background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyhslcK5oQ2mB4tlTPUCiNTpKEz2qfoQENCw&usqp=CAU");
 width:80%;
 flex-wrap:wrap;
   
`
// const Wrraper = styled.div`
//  padding :20px;

//
//  background-color:white;
//  border-radius:10px;
//  box-shadow: 3px 3px 8px grey;
//  flex:1;
//  margin-left:100px;
//  margin-right:100px;

// `
const Form = styled.form`
display:flex;
flex-direction: row;
justify-content:start;
align-items:start;
flex-wrap:wrap;
// width: 75%;
`
const Title = styled.h1`
color: rgb(21, 92, 104);
font-size:24px;
font-weight:300;
`
const Input = styled.input`
flex:1;

padding :10px;
transition:transform 2s;
border-radius:5px;
width: calc(100%);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
 
// box-shadow: 1px 1px 5px grey;
 &:hover{
    transform: scaleX(1.025);
 }
`

const Label = styled.label`
  color: rgb(21, 92, 104);
  padding:10px;
`


const Div = styled.div`

  display:flex;
  
  flex-direction:column;
  margin-top: 10px;
  margin-right: 4rem;
  width: 400px;
`
const PassangerDiv = styled.div`

  display:flex;
  align-items: center;
  margin-top: 10px;
 
  width: 400px;
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
const ButtonContainer = styled.div`
    display:flex;
    justify-content:center;
    margin-top:3rem;
    border-radius:20px;
    align-items: end;
    gap: 1rem;
`
const Cancel = styled.button`
   transition: all .3s ease-in-out;
  border-radius:5px;
  color:white;
  width:200px;
  height:50px;
  font-size:16px;
  //background-color: #b7b5b5;
  outline: #b7b5b5;
  cursor:pointer;
  color: black;
  /* box-shadow:0 0 5px yellow,
          0 0 25px yellow; */
  &:hover{
    
    /* box-shadow:0 0 5px yellow,
        0 0 25px yellow , 0 0 50px yellow,
        0 0 100px yellow, 0 0 200px yellow; */
        box-shadow: 0px 0px 18px 0px rgba(121, 122, 122, 0.75);
        -webkit-box-shadow: 0px 0px 18px 0px rgba(161, 167, 164, 0.75);
        -moz-box-shadow: 0px 0px 18px 0px rgba(167, 170, 169, 0.75);
  }
`
const Submit = styled.button`
  transition: all .3s ease-in-out;
  border-radius:10px;
  width:200px;
  color:white;
  height:50px;
  font-size:16px;
  cursor:pointer;
  background-color: rgb(255, 165, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 13rem;
  /* box-shadow:0 0 5px yellow,
          0 0 25px yellow; */
  &:hover{
    font-size:18px;
    box-shadow: 0px 0px 18px 0px rgba(255, 165, 0, 0.75);
-webkit-box-shadow: 0px 0px 18px 0px rgba(255, 165, 0, 0.75);
-moz-box-shadow: 0px 0px 18px 0px rgba(255, 165, 0, 0.75);
  }
`
const Addbutton = styled.button`
display: flex;
align-items: end;
padding: 0.5rem;
color: white;
background-color: rgb(21, 92, 104);
border-radius:10px;
margin-top: 1rem;
`
const Removebutton = styled.button`
font-size: 21px;
color: red;
margin-left: 20px;
background-color: white;
`


const MakeRequest = () => {
  const user = useSelector(state => state.user)
  const inputArray = [{
    value: ''
  }]
  const navigate = useNavigate()
  const [Passangers, setPassangers] = useState(inputArray)
  const [name, setName] = useState('Abel Ayalew')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [destination, setDestination] = useState('')
  const [pickUpDate, setPickUpDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => {
  //   setOpen(false)
  //   navigate('/pending')

  // };


  const [isModalOpen, setIsModalOpen] = useState(false);
      
  const handleButtonClick = () => {
      
    setIsModalOpen(true);
  };


  const addInput = (e) => {
    e.preventDefault()
    setPassangers((arr) => [...arr, { value: '' }])
  }
  const handleChange = (e) => {
    const index = e.target.id
    setPassangers(arr => {
      const newArr = arr.slice();
      newArr[index].value = e.target.value;
      return newArr
    })

  }



  const handleSubmit = () => {
   
    setIsLoading(true)
    createRequest({ name, phoneNumber, destination, pickUpDate, returnDate, description, Passangers }).then(({ data }) => {
      console.log(data)
      setIsLoading(false)
      // handleOpen()

    }).catch((err) => {
      setIsLoading(false)
      console.log(err)
    })

  }
  const removeInput = (e) => {
    e.preventDefault()
    const index = e.target.id

    if (Passangers.length > 1) {
      setPassangers(arr => {

        return arr.toSpliced(index)

      })
    }
  }


  return (
    <>

      <Container>

        <Wrraper>
          <Title><b>REQUEST FORM</b></Title>
          <Form >
            <Div>
              <Label>Full Name</Label>
              <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            </Div>
            <Div>
              <Label>Phone No.</Label>
              <Input placeholder="Phone" type='tel' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </Div>
            <Div>
              <Label>PickUp date</Label>
              <Input placeholder="Pickup date" type='date' value={pickUpDate} onChange={(e) => setPickUpDate(e.target.value)} />
            </Div>
            <Div>
              <Label>Return date</Label>
              <Input placeholder="Return date" type='date' value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
            </Div>
            <Div>
              <Label>Destination</Label>
              <Input placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
            </Div>
            <Div>
              <Label>Discription</Label>
              <TextArea
                placeholder="Discription"
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                rows={4}
              />
            </Div>
            <Div>
            <div>
              <Label> Passangers</Label>
              {Passangers?.map((item, i) => {
                return (
                  <PassangerDiv key={i} >
                    <Input
                      onChange={handleChange}
                      value={item.value}
                      id={i}
                      type='text'
                      size="40"
                    />

                    <Removebutton id={i} onClick={removeInput}>X</Removebutton>
                  </PassangerDiv>
                );
              })}
              <Addbutton onClick={addInput}>Add Passenger</Addbutton>
            </div>
            </Div>
            <ButtonContainer>
            {/* <Cancel>
              Cancel
            </Cancel> */}
            <Submit type='submit' onClick={handleButtonClick} disabled={isLoading}>
              {isLoading ? <Loader /> : 'Submit'}
            </Submit>
            <DialogModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit}/>
          </ButtonContainer>
          </Form>

        </Wrraper>
        {/* <CustomModal open={open} handleClose={handleClose
        } handleOpen={handleOpen} /> */}


      </Container></>
  )

  //     <>
  //       <Navbar title={'Staff Dashboard'} />
  //       <Container>

  //         <Wrraper>
  //           <Title>REQUEST FORM</Title>
  //           <Form>
  //             <Div>
  //               <label>full name</label>
  //               <Input placeholder="Full Name" />
  //             </Div>
  //             <Div>
  //               <label>phone</label>
  //               <Input placeholder="Phone" />
  //             </Div>
  //             <Div>
  //               <label>PickUp date</label>
  //               <Input placeholder="Pickup date" />
  //             </Div>
  //             <Div>
  //               <label>Return date</label>
  //               <Input placeholder="Return date" />
  //             </Div>
  //             <Div>
  //               <label>destination</label>
  //               <Input placeholder="Destination" />
  //             </Div>
  //             <Div>
  //               <lable>Number of passanger</lable>
  //               <Input placeholder="Number of passanger" />
  //             </Div>

  //           </Form>
  //           <TextArea placeholder="discription" />
  //           <div>
  //             <button onClick={addInput}>+</button>
  //             {inputArr?.map((item, i) => {
  //               return (
  //                 <Input
  //                   onChange={handleChange}
  //                   value={item.value}
  //                   id={i}
  //                   type={item.type}
  //                   size="40"
  //                 />
  //               );
  //             })}
  //             <button onClick={removeInput}>-</button>
  //           </div>
  //         </Wrraper>
  //       </Container>
  //     </>)

}

export default MakeRequest