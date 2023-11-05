import styled from 'styled-components'
import { Background, Mint } from '../asset';
const Container=styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:100vw;
    height:100vh;
    background-color: #e0e0e0;
   
`
const ImgmintContainer = styled.div`
   display:flex;
   justify-content:center;
   align-items:center;
  
  width: 100px;
  height: 100px;
  margin-left: 5px;
`;


const Img1 = styled.img`
  width: 100px;
  height:100px;
  object-fit: cover;
`;
const Wrapper=styled.div`
margin-top:50px;
padding:20px;
border-radius:30px;
display:flex;
align-items:center;
justify-content:center;
width:50%;

height:80vh;
background-color: #fff;
flex-direction: column;
border: 3px solid orange;
  box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
-webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
-moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
`

const Form =styled.form`
display: flex;
justify-content:center;

flex-wrap: wrap;

width: 100%;
margin:10px 0;
`
const Desc = styled.h1`
  text-align: center;
`;

const InputForm=styled.input`
box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
-webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
-moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
margin: 5px 0;
padding: 10px;
width: 300px;
border: 1px solid #ccc;
border-radius: 10px;
margin-bottom: 10px;
`
const Lable=styled.p`
  margin-top:5px;
`
const LabledInput=styled.div`
   display:flex;
   flex-direction:column;
   padding-right:20px;
`
const Button =styled.button`
background-color: #164E62;
color: white;
border: none;
border-radius: 5px;
padding: 10px 20px;
font-size: 16px;
cursor: pointer;
margin-top: 20px;
display:flex;
align-items: center;
justify-content: center;
width: 400px;
`
const TransManagerResponse=()=>{

    return(

        <Container>
               <Wrapper> 
                   <Desc>Aproval Form </Desc>
                   <ImgmintContainer>
                  <Img1 src={Mint} />
               </ImgmintContainer>
                   <Form> 
                       <LabledInput>
                           <Lable>Plate Number</Lable>
                           <InputForm placeholder="Plate Number"/>
                       </LabledInput>
                       <LabledInput>
                           <Lable>Driver name</Lable>
                           <InputForm placeholder="Driver name"/>
                       </LabledInput>
                       <LabledInput>
                           <Lable>Driver phone</Lable>
                           <InputForm placeholder="Driver phone"/>
                       </LabledInput>
                       <LabledInput>
                           <Lable>Car model</Lable>
                           <InputForm placeholder="Car Model"/>
                       </LabledInput>
                       <LabledInput>
                           <Lable>Return Date</Lable>
                           <InputForm placeholder="MM/dd/yy"/>
                       </LabledInput>
                       <Button>Send</Button>
                   </Form>
                </Wrapper>     
        </Container>
    )

}
export default TransManagerResponse;