import React from 'react'
import styled from 'styled-components'
import { Mint, MintText } from '../asset'
import Navbar from './Navbar'
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { NavLink, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../redux/features/user';
const Container = styled.div`
   
    width:315px;
    padding: 10px;
    margin-top: 30px;
   // background-color: #C9F7FF;
    height:calc( 100vh - 40px);
    position: fixed;
    top: 0;
    bottom: 0;
`

const List = styled.ul`
color: red;
list-style: none;
`

const ListItem = styled.li`
/* display:flex;
padding:10px 20px ;
margin-bottom: 10px;
/* background-color: #F5F5F7; */
/* border-radius: 5px;
font-weight: 400;
color: red;
cursor: pointer;
/* color:#8E92BC; */ 

&:hover::before {
    content: attr(title);
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 8px;
    background-color: #000;
    color: #fff;
    border-radius: 2px;
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
  }
`

const ListItemLogOut = styled.li`
 display:flex;
padding:10px 20px ;
margin-bottom: 10px;
position:absolute;
margin-bottom:40px;
bottom:0;
/* background-color: #F5F5F7; */
border-radius: 5px;
font-weight: 400;
/* color: #141522; */
cursor: pointer;
color:rgba(255, 165, 0, 0.75); 
position: absolute;
bottom: 0;

&:hover, &:focus{
    color: #18616C !important;
    background-color: rgba(211, 248, 255,0.4) !important;
};

`

const Logo = styled.img`
height: 40px;
`

const ImgContainer = styled.div`
margin-bottom: 1.5rem;
display: flex;
align-items: center;
`

const ListWrapper = styled.div`
display: flex;

flex-direction: column;
align-content: space-between;
box-shadow: 2px 0px 2px 0px rgba(255, 165, 0, 0.75);
margin-left: -2rem;

//padding: 20px 30px ;
//height: 100vh;    
padding: 20px;
height: 100vh; 
width:315px;  
position: relative;

`

const SideBar = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user?.user);
    const navigate = useNavigate()
    console.log('>> user: ', user)
    return (

        <Container>

            <ListWrapper>
                <List>

                    {user?.role === 'staff' && 
                        <>
                        <ListItem><NavLink className={'nav-link'} to='/booking'> <ImportContactsOutlinedIcon style={{ marginRight: '10px' }} />Booking</NavLink></ListItem>
                        <ListItem><NavLink className={'nav-link'} to='/history'><RestoreOutlinedIcon style={{ marginRight: '10px' }} />History</NavLink></ListItem>
                        </>
                    }

                    {user?.role === 'staff-manager' &&
                        <>
                        <ListItem><NavLink className={'nav-link'} to={'/pending-user-request'} ><PendingActionsOutlinedIcon style={{ marginRight: '10px' }} />Pending</NavLink></ListItem>

                        <ListItem><NavLink className={'nav-link'} to='/requests-history'> <ImportContactsOutlinedIcon style={{ marginRight: '10px' }} />History</NavLink></ListItem>

                        </>
                    }
                    {user?.role === 'transport-manager' &&
                        <>
                        <ListItem><NavLink className={'nav-link'} to='/requests'> <ImportContactsOutlinedIcon style={{ marginRight: '10px' }} />Requests</NavLink></ListItem>
                            <ListItem><NavLink className={'nav-link'} to={'/add-new-car'} ><PendingActionsOutlinedIcon style={{ marginRight: '10px' }} />Add New Car</NavLink></ListItem>
                            <ListItem><NavLink className={'nav-link'} to='/add-new-driver'> <ImportContactsOutlinedIcon style={{ marginRight: '10px' }} />Add New Driver</NavLink></ListItem>
                            <ListItem><NavLink className={'nav-link'} to={'/available-car'} ><PendingActionsOutlinedIcon style={{ marginRight: '10px' }} />Available Car</NavLink></ListItem>

                        </>
                    }
                    {user.role === 'admin' &&
                        <>

                        <ListItem><NavLink className={'nav-link'} to='/user-list'> <ImportContactsOutlinedIcon style={{ marginRight: '10px' }} />User</NavLink></ListItem>
                        <ListItem><NavLink className={'nav-link'} to={'/pending-user-register-request'} ><PendingActionsOutlinedIcon style={{ marginRight: '10px' }} />Pending Requests</NavLink></ListItem>
                        <ListItem><NavLink className={'nav-link'} to={'/user-register-request'} ><PendingActionsOutlinedIcon style={{ marginRight: '10px' }} />User Register Requests</NavLink></ListItem>
                        <ListItem><NavLink className={'nav-link'} to={'/Add-department'} ><PendingActionsOutlinedIcon style={{ marginRight: '10px' }} />Department</NavLink></ListItem>
   
                        </>
                    }

                
                <ListItemLogOut title="logout" onClick={() => {

                        dispatch(logOutUser())
                        navigate('/home')

                    }}> <SettingsOutlinedIcon style={{ marginRight: '10px' }} />Logout</ListItemLogOut>

                </List>
            </ListWrapper>
        </Container>


    )
}

export default SideBar