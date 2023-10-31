import React from 'react'
import styled from 'styled-components'
import { Mint, MintText } from '../asset'
import Navbar from './Navbar'
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
const Container = styled.div`
    flex: 1;
    padding: 10px;
    background-color: #cdced47e;
    height: 100vh;
    position: sticky;
    top: 0;
    bottom: 0;
`
const List = styled.ul`
list-style: none;
`
const ListItem = styled.li`
/* display:flex;
padding:10px 20px ;
margin-bottom: 10px;
/* background-color: #F5F5F7; */
/* border-radius: 5px;
font-weight: 400; */
/* color: #141522; */
cursor: pointer;
/* color:#8E92BC; */ 

`
const Logo = styled.img`
height: 40px;
`
const ImgContainer = styled.div`
display: flex;
align-items: center;
`
const ListWrapper = styled.div`
padding: 20px;
    
`
const SideBar = () => {
    return (

        <Container>
            <ImgContainer>
                <Logo src={Mint} />
                <Logo src={MintText} />
            </ImgContainer>
            <ListWrapper>
                <List>
                    <ListItem><NavLink className={'nav-link'} to={'/pending'} ><PendingActionsOutlinedIcon style={{ marginRight: '10px' }} />Pending</NavLink></ListItem>
                    <ListItem><NavLink className={'nav-link'} to='/history'><RestoreOutlinedIcon style={{ marginRight: '10px' }} />History</NavLink></ListItem>
                    <ListItem><NavLink className={'nav-link'} to='/booking'> <ImportContactsOutlinedIcon style={{ marginRight: '10px' }} />Booking</NavLink></ListItem>
                    <ListItem><NavLink className={'nav-link'} to='/'> <SettingsOutlinedIcon style={{ marginRight: '10px' }} />Logout</NavLink></ListItem>
                </List>
            </ListWrapper>
        </Container>


    )
}

export default SideBar