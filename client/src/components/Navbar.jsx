
import React, { useState } from 'react'
import styled from 'styled-components'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Badge from '@mui/material/Badge';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Mint, MintText } from '../asset';
import { Avatar } from '@mui/material';
import { stringAvatar } from '../utils';
import { useTranslation } from 'react-i18next';
import { Language } from '@mui/icons-material';
const Container = styled.div`
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 10;
    background-color: #fff;
    color:#023047 ;
   // border-bottom: 2px solid #C9F7FF ;
    /* padding: 20px; */
`
const Wrapper = styled.div`
display: flex;
align-items: center;
/* justify-content: space-between; */
padding: 5px;
`
const Left = styled.div`
padding: 0 10px;
`

const Right = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
gap: 1rem;
`
const Title = styled.span`
    
`
const UserName = styled.span`
    
`
const User = styled.div`
    display: flex;
    align-items: center;
    margin: 0 20px 0 10px;

`
const Img = styled.img`
height: 40px;
width: 40px;
border-radius: 50%;
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

const SearchBox = styled.form` 
border: 1px solid #C9F7FF;
display: flex;
align-items: center;
justify-content: space-between;
border-radius: 5px;
width: 400px;
background-color:rgba(245, 245, 245,0.5);
`

const ImgContainer = styled.div`
display: flex;
align-items: center;
`
const Center = styled.div`
flex: 4;
display: flex;
align-items: center;
justify-content: space-between;
`
const LeftWrraper = styled.div`
flex: 1;
display: flex;
align-items: center;
`
const Logo = styled.img`
height: 40px;
`
const UserRole = styled.span`
font-weight: 300;
font-size: 14px;

`
const UserDetail = styled.div`
margin-left: 5px;
display: flex;
flex-direction: column;
`
const Navbar = () => {
    const { t, i18n } = useTranslation('global')
    const { user, noOfNotifications } = useSelector(state => state.user)
    console.log(' user?.notifications', noOfNotifications)
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/search/${searchTerm}`)
    }
    const handleLanguage = () => {
        if (i18n.language === 'en') {
            i18n.changeLanguage('ኣማ')
        } else {
            i18n.changeLanguage('en')
        }
    }
    const title = `${user?.firstName} ${user?.lastName}`

    return (
        <Container>
            <Wrapper>
                <LeftWrraper>
                    <ImgContainer>
                    <Logo src={Mint} />
                    <Logo src={MintText} />
                </ImgContainer>
                </LeftWrraper>

                <Center>
                <Left>
                    <SearchBox onSubmit={handleSubmit}>
                        <Input type='text' placeholder='search...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <SearchOutlinedIcon style={{ margin: '0 5px', }} />
                    </SearchBox>
                </Left>
                <Right>
                        <Badge badgeContent={i18n.language} color="primary" >
                            <Language onClick={() => handleLanguage()} />
                        </Badge>
                        <Badge badgeContent={noOfNotifications} color="primary">
                            <Link to={'/notification'}> <NotificationsActiveOutlinedIcon /></Link>
                    </Badge>


                    <User>
                            {/* <Img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D" /> */}
                            <Link to={'/profile'}>   <Avatar {...stringAvatar(`${title}`)} alt={title} /></Link>
                            <UserDetail>
                                <UserName>{title}</UserName>
                                <UserRole>{user?.role}</UserRole>
                            </UserDetail>



                    </User>
                </Right>
                </Center>
            </Wrapper>
            {/* <Hr /> */}
        </Container>
    )
}

export default Navbar

