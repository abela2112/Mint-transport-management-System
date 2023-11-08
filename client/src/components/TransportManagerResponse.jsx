import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material'
import {useState}  from 'react'


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
// border-radius:30px;
display:flex;
align-items:center;
justify-content:center;
width:100%;

height:80vh;
background-color: #fff;
flex-direction: column;
// border: 3px solid orange;
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
padding:10px;
`
const Desc = styled.h1`
  text-align: center;
`;

const InputForm=styled.input`
// box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
// -webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
// -moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
margin: 5px 0;
padding: 10px;
width:400px;
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
const ButtonConatainer =styled.button`
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
const TransportManagerResponse=({ open, setOpen,onSubmit })=>{

   const [isOpen, setIsOpen] = useState(false)
   const [plateNumber,setPlateNumber]=useState('')
       const [driverName,setDriverName]=useState('')
       const [driverPhone,setDriverPhone]=useState('')
       const [carModel,setCarModel]=useState('')
       const [returnDate,setReturnDate]=useState('')

      
        const handleOpen = () => {
            setIsOpen(true)
        }
    
        const handleClose = () => {
            
setOpen(false)
            
        }
    
        const handleSubmit = (e) => {
            
            onSubmit({plateNumber,driverName,driverPhone,carModel,returnDate})
            handleClose()
        }
    
        return (
            <>
                {/* <Button onClick={handleOpen}>Open dialog</Button> */}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='dialog-title'
                    aria-describedby='dialog-description'
                    maxWidth='md'
                    fullWidth={true}
                    overflow='hidden'
                >   
                    <DialogTitle id='dialog-title' style={{textAlign:"center"}}>Approve Form</DialogTitle>
                    <DialogContent id='dialog-description' style={{display:"flex", justifyContent:"center", alignContent:"center" ,padding:"20px"}}>
                       
                  
                   
                       <ImgmintContainer>
                           <Img1 src={Mint} />
                      </ImgmintContainer>
                   <Form> 
                       <LabledInput>
                           <Lable>Plate Number</Lable>
                           <InputForm 
                           type="text"
                            placeholder="Plate Number"
                            value={plateNumber}
                            onChange={(e)=>setPlateNumber(e.target.value)}
                            />
                       </LabledInput>
                       <LabledInput>
                           <Lable>Driver name</Lable>
                           <InputForm 
                           type="text"
                           placeholder="Driver name"
                           value={driverName}
                           onChange={(e)=>setDriverName(e.target.value)}
                           />
                       </LabledInput>
                       <LabledInput>
                           <Lable>Driver phone</Lable>
                           <InputForm 
                           type="text"
                           placeholder="Driver phone"
                           value={driverPhone}
                           onChange={(e)=>setDriverPhone(e.target.value)}
                           />
                       </LabledInput>
                       <LabledInput>
                           <Lable>Car model</Lable>
                           <InputForm 
                           type="text"
                           placeholder="Car Model"
                           value={carModel}
                           onChange={(e)=>setCarModel(e.target.value)}
                           />
                       </LabledInput>
                       <LabledInput>
                           <Lable>Return Date</Lable>
                           <InputForm
                            type="text"
                            placeholder="MM/dd/yy"
                            value={returnDate}
                            onChange={(e)=>setReturnDate(e.target.value)}
                            />
                       </LabledInput>
                     
                   </Form>


             
                
                       
                     </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button autoFocus onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
    
    


export default TransportManagerResponse