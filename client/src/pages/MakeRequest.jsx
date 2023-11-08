import styled from 'styled-components'

import { createRequest } from '../api/userApi'
import { useState } from 'react'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'

import CustomModal from '../components/Modal'
import DialogModal from '../components/DialogModal'
import { useSelector } from 'react-redux'

const Container = styled.div`
   width:100%;
   height:100vh;
   display:flex;
   /* align-items:center;
   justify-content:center; */

   flex-direction:column;
   position:relative;`

const Wrraper = styled.div`
 padding :10px;
 margin-top:0px;
 //background-color:rgba(222, 222, 222,0.2);
 //background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyhslcK5oQ2mB4tlTPUCiNTpKEz2qfoQENCw&usqp=CAU");
 width:100%;
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
/* justify-content:center;
align-items:center; */
flex-wrap:wrap;

`
const Title = styled.h1`
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
 
  width: 400px;
`
const TextArea = styled.textarea`
  margin-top:10px;
  min-width:400px;
  border-radius:10px;
  padding:10px;
  border: 1px solid #ccc;
  width: 100%;
 //box-shadow: 2px 2px 5px grey;
`
const ButtonContainer = styled.div`
    display:flex;
    justify-content:flex-end;
    margin-top:20px;
    border-radius:20px;
    align-items: center;
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
  background-color: rgb(21, 92, 104);
  display: flex;
  align-items: center;
  justify-content: center;
  /* box-shadow:0 0 5px yellow,
          0 0 25px yellow; */
  &:hover{
    font-size:18px;
    box-shadow: 0px 0px 18px 0px rgba(21, 92, 104,0.75);
-webkit-box-shadow: 0px 0px 18px 0px rgba(21, 92, 104,0.75);
-moz-box-shadow: 0px 0px 18px 0px rgba(21, 92, 104,0.75);
  }
`
const Addbutton = styled.button`
padding: 5px 7px;
color: white;
background-color: rgb(21, 92, 104);

`
const Removebutton = styled.button`
padding: 5px 7px;
color: white;
margin-left: 20px;
background-color: rgb(21, 92, 104);

`


const MakeRequest = () => {
  const { user } = useSelector(state => state.user)
  const inputArray = [{
    value: ''
  }]
  const navigate = useNavigate()
  const [Passangers, setPassangers] = useState(inputArray)
  const [name, setName] = useState(`${user?.firstName} ${user?.lastName}`)
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
    console.log(index)
    if (Passangers.length > 1) {
      setPassangers(arr => {
        return [...arr].toSpliced(index, 1)
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
              <Label>full name</Label>
              <Input placeholder="Full Name" disabled value={name} onChange={(e) => setName(e.target.value)} />
            </Div>
            <Div>
              <Label>phone</Label>
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
              <Label>destination</Label>
              <Input placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
            </Div>
            <Div>
              <Label>discription</Label>
              <TextArea placeholder="discription" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Div>


            <div>
              <Label> passangers</Label>
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

                    <Removebutton id={i} onClick={removeInput}> Remove</Removebutton>
                  </PassangerDiv>
                );
              })}
              <Addbutton onClick={addInput}>add Passenger</Addbutton>

            </div>

          </Form>

          <ButtonContainer>
            {/* <Cancel>
              Cancel
            </Cancel> */}
            <Submit type='submit' onClick={handleButtonClick} disabled={isLoading}>
              {isLoading ? <Loader /> : 'Submit'}
            </Submit>
            <DialogModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit}/>
          </ButtonContainer>

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