import styled from 'styled-components'
import Search from '@mui/icons-material/Search';


const Container=styled.div`
   height:100px;
  margin-top:0;
`
const Wrapper=styled.div`
   width:100vw;
   background-color:darkBlue;
   display:flex;
   justify-content:space-between;
   align-items:center;
   padding:0;
   margin:0;

`
 const Left=styled.div`
 display:flex;
 align-items:center;
 flex:1;
 `   
 const Center=styled.div`
 text-align:center;
 flex:1;
 `   
 
 const Right=styled.div`
 display:flex;
 justify-content:flex-end;
 align-items:center;
 flex:1;

 `   

 const SearchContainer =styled.div`
 display:flex;
 align-items:center;
 border:0.5px solid ;
 background-color:darkOrange;
 margin-left:35px;
 padding:15px;
 border-radius:30%;
 `
const Input=styled.input`
    border:none;
    height:30px;
`

const Logo=styled.img`
width:70px;
height:70px;
border-radius:50%;
&:hover{
    transform:scale(1.5,1.5);
    transition:1s;
}

`
const MenuItem=styled.button`
   font-size:14px;
   cursor:pointer;
   margin-left:20px;
   margin-right:20px;
   background-color:darkOrange;
   &:hover{
     transform:scaleX(1.1);
     transition:1s;
   }
   width:70px;
   height:30px;
   border-radius:30%;
   color:white;
   text-align:center;
`

const Navbar = () => {
  return (
    <Container>
       <Wrapper>
             <Left>
               
                <SearchContainer>
                    <Input placeholder="Search"/>
                   <Search style={{color:"blue",fontSize:20}}/>
                </SearchContainer>
             </Left>
             <Center><Logo src="data:image/jpeg;base64,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"/></Center>
             <Right>
                <MenuItem>REGISTER</MenuItem>
                <MenuItem>SIGN IN</MenuItem>
             </Right>
       </Wrapper>
    </Container>
  )
}

export default Navbar






