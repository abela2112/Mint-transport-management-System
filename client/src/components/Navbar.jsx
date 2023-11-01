
import React from 'react'
import styled from 'styled-components'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Badge from '@mui/material/Badge';
const Container = styled.div`
    width: 100%;
    height: 40px;
   
    /* padding: 20px; */
`
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 5px;
`

const Left = styled.div`
padding: 0 10px;
`

const Right = styled.div`
display: flex;
align-items: center;
`
const Title = styled.span`
    
`
const UserName = styled.span`
    
`
const User = styled.div`
    display: flex;
    align-items: center;
    margin: 0 10px;

`
const Img = styled.img`
height: 40px;
width: 40px;
object-fit: cover;
margin-left:10px;

`
const Input = styled.input`
flex: 2;
color:#54577A;
padding: 10px;
border: none;

background-color: transparent;

&:focus{
border-color: #18616C;
}
`
const SearchBox = styled.div` 
border: 1px solid #C9F7FF;
display: flex;
align-items: center;
justify-content: space-between;
border-radius: 5px;
width: 400px;
background-color: rgba(222, 222, 222,0.1);
`
const Hr = styled.hr`
    width: 100%;
    height: 2px;
    background-color: #C9F7FF;
`
const Navbar = ({title}) => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <SearchBox>
                        <Input type='text' placeholder='search...' />
                        <SearchOutlinedIcon style={{ margin: '0 5px', }} />
                    </SearchBox>
                </Left>
                <Right>
                    <Badge badgeContent={4} color="primary">
                        <NotificationsActiveOutlinedIcon />
                    </Badge>


                    <User>
                        <UserName>Abel Ayalew</UserName>
                        <Img src='' />
                    </User>
                </Right>
            </Wrapper>
            <Hr />
        </Container>
    )
}

export default Navbar
