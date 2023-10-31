import styled from 'styled-components'
import Navbar from '../components/Navbar'

const Container=styled.div`
   width:100vw;
   height:100vh;
   display:flex;
   align-items:center;
   justify-content:center;
   flex-direction:column;
   background-color:lightCyan;
   position:relative;
`
const Wrraper =styled.div`
 padding :10px;
 margin-top:0px;
 background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyhslcK5oQ2mB4tlTPUCiNTpKEz2qfoQENCw&usqp=CAU");
 width:40%;
 background-color:white;
 border-radius:10px;
 box-shadow: 3px 3px 8px grey;
 flex:1;
 margin-left:100px;
 margin-right:100px;

`
const Form =styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-wrap:wrap;

`
const Title=styled.h1`
font-size:24px;
font-weight:300;
`
const Input =styled.input`
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
const Div=styled.div`
flex:1;
  display:flex;
  margin:10px 20px;
  flex-direction:column;
`
const TextArea =styled.textarea`

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
  return (
        <Container>
            <Navbar/>
            <Wrraper>
                <Title><b>REQUEST FORM</b></Title>
                <Form>
                     <Div>
                     <Label>full name</Label>
                     <Input placeholder="Full Name"/>
                     </Div>
                     <Div>
                     <Label>phone</Label>
                     <Input placeholder="Phone"/>
                     </Div>
                     <Div>
                     <Label>PickUp date</Label>
                     <Input placeholder="Pickup date"/>
                     </Div>
                     <Div>
                    <Label>Return date</Label>
                     <Input placeholder="Return date"/>
                     </Div>
                     <Div>
                     <Label>destination</Label>
                     <Input placeholder="Destination"/>
                     </Div>
                     <Div>
                     <Label>Number of passanger</Label>
                     <Input placeholder="Number of passanger"/>
                     </Div>
                     <Div> 
                     <Label>discription</Label>
                    <TextArea placeholder="discription"/>
                    </Div>

                </Form>
                <ButtonContainer>
                    <Cancel>
                       <b>Cancel</b> 
                    </Cancel>
                    <Submit>
                       <b>Submit</b> 
                    </Submit>
                </ButtonContainer>
                
                
            </Wrraper>
            
               
            
        </Container>
  )
}

export default Request