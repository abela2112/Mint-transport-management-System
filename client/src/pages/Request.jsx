import styled from 'styled-components'
import Navbar from '../components/Navbar'

import { useState } from 'react'
import { useTranslation } from "react-i18next"

const Container = styled.div `
   width:100%;
   height:100vh;
   display:flex;
   align-items:center;
   justify-content:center;
   flex-direction:column;
   background-color:lightCyan;
   position:relative;
`
// const Wrraper =styled.div`
//  padding :10px;
//  margin-top:0px;
//  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyhslcK5oQ2mB4tlTPUCiNTpKEz2qfoQENCw&usqp=CAU");

   
   
//`
const Wrraper = styled.div`
 padding :20px;

 width:40%;
 background-color:white;
 border-radius:10px;
 box-shadow: 3px 3px 8px grey;
 flex:1;
 margin-left:100px;
 margin-right:100px;

`
const Form = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-wrap:wrap;

`

const Title = styled.h1`
font-size:24px;
font-weight:300;

`


const Input = styled.input`
flex:1;
min-width:40%;
padding :10px;
transition:transform 2s;
border-radius:5px;
 box-shadow: 1px 1px 5px grey;
 &:hover{
    transform: scaleX(1.1);
 }
`

const Label=styled.label`
  padding:10px;
`


const Div = styled.div`

  display:flex;
  margin:10px 20px;
  flex-direction:column;
`

const TextArea = styled.textarea`
  margin-top:10px;
  min-width:480px;
  border-radius:10px;
  padding:10px;
 box-shadow: 2px 2px 5px grey;
`
const ButtonContainer=styled.div`
    display:flex;
    justify-content:space-around;
    margin-top:20px;
    border-radius:20px;
`
const Cancel =styled.button`
 
  border-radius:25px;
  color:black;
  width:150px;
  height:50px;
  font-size:20px;
  box-shadow:0 0 5px yellow,
          0 0 25px yellow;
  &:hover{
    cursor:pointer;
    box-shadow:0 0 5px yellow,
        0 0 25px yellow , 0 0 50px yellow,
        0 0 100px yellow, 0 0 200px yellow;
  }
`
const Submit=styled.button`

  border-radius:25px;
  width:150px;
  color:black;
  height:50px;
  font-size:20px;
  box-shadow:0 0 5px yellow,
          0 0 25px yellow;
  &:hover{
    cursor:pointer;
    box-shadow:0 0 5px yellow,
        0 0 25px yellow , 0 0 50px yellow,
        0 0 100px yellow, 0 0 200px yellow;
  }
`




const Request = () => {
  const {t}=useTranslation('global')
  const inputArray = [{
    type: 'text',
    id: 1,
    value: ''
  }]
  const [inputArr, setInputArr] = useState(inputArray)
  const addInput = () => {
    setInputArr((arr) => [...arr, { type: 'text', value: '', id: Math.random() * 1000 }])
  }
  const handleChange = (e) => {
    const index = e.target.id
    setInputArr(arr => {
      const newArr = arr.slice();
      newArr[index].value = e.target.value;
      return newArr
    })

  }
  const removeInput = (e) => {
    if (inputArr.length > 1) {setInputArr(arr => {
       
        return arr.slice(0, arr.length -1)
      
    })}
  }

  

  console.log(inputArr)
  return (

        <Container>
            <Navbar/>
            <Wrraper>
                <Title><b>{t("Request.requestForm")}</b></Title>
                <Form>
                     <Div>
                     <Label>{t("Request.fullName")}</Label>
                     <Input placeholder={t("Request.fullName")}/>
                     </Div>
                     <Div>
                     <Label>{t("Request.phoneNumber")}</Label>
                     <Input placeholder={t("Request.phoneNumber")}/>
                     </Div>
                     <Div>
                     <Label>{t("Request.pickUpDate")}</Label>
                     <Input placeholder={t("Request.pickUpDate")}/>
                     </Div>
                     <Div>
                    <Label>{t("Request.returnDate")}</Label>
                     <Input placeholder={t("Request.returnDate")}/>
                     </Div>
                     <Div>
                     <Label>{t("Request.destination")}</Label>
                     <Input placeholder={t("Request.destination")}/>
                     </Div>
                     <Div>
                     <Label>{t("Request.passengerNumber")}</Label>
                     <Input placeholder={t("Request.passengerNumber")}/>
                     </Div>
                     <Div> 
                     <Label>{t("Request.description")}</Label>
                    <TextArea placeholder={t("Request.description")}/>
                    </Div>

                </Form>
                <ButtonContainer>
                    <Cancel>
                       <b>{t("Request.cancel")}</b> 
                    </Cancel>
                    <Submit>
                       <b>{t("Request.submit")}</b> 
                    </Submit>
                </ButtonContainer>
                
                
            </Wrraper>
            
               
            
        </Container>
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

export default Request
