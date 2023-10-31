import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { useState } from 'react'



const Container = styled.div`
   width:100%;
   height:100vh;
   display:flex;
   align-items:center;
   justify-content:center;
   
   
`
const Wrraper = styled.div`
 padding :20px;
 width:40%;
 background-color:white;
 border: 1px solid black;
 border-radius:10px;
 box-shadow: 2px 2px 5px grey;
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
margin:10px 5px 0px 0px;
padding:10px;
border-radius:10px;
 box-shadow: 2px 2px 5px grey;
`
const Label = styled.label`

`
const Div = styled.div`
  display:flex;
  
  
  flex-direction:column;
`
const TextArea = styled.textarea`
  margin-top:10px;
  min-width:480px;
  border-radius:10px;
 box-shadow: 2px 2px 5px grey;
`
const Request = () => {
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
    <>
      <Navbar title={'Staff Dashboard'} />
      <Container>

        <Wrraper>
          <Title>REQUEST FORM</Title>
          <Form>
            <Div>
              <label>full name</label>
              <Input placeholder="Full Name" />
            </Div>
            <Div>
              <label>phone</label>
              <Input placeholder="Phone" />
            </Div>
            <Div>
              <label>PickUp date</label>
              <Input placeholder="Pickup date" />
            </Div>
            <Div>
              <label>Return date</label>
              <Input placeholder="Return date" />
            </Div>
            <Div>
              <label>destination</label>
              <Input placeholder="Destination" />
            </Div>
            <Div>
              <lable>Number of passanger</lable>
              <Input placeholder="Number of passanger" />
            </Div>

          </Form>
          <TextArea placeholder="discription" />
          <div>
            <button onClick={addInput}>+</button>
            {inputArr?.map((item, i) => {
              return (
                <Input
                  onChange={handleChange}
                  value={item.value}
                  id={i}
                  type={item.type}
                  size="40"
                />
              );
            })}
            <button onClick={removeInput}>-</button>
          </div>
        </Wrraper>
      </Container>
    </>)
}

export default Request