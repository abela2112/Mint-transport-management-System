import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';
import { deleteNotification, updateNotification } from '../redux/features/user';
import axios from 'axios';
import { formatDistance } from 'date-fns';
import Navbar from './Navbar';
import { avatar } from '../asset';
//import { Title } from './StaffMangerPendingRequests';
const NotificationCard = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 10px;
       // background-color:${(({ seen }) => seen ? '#d7d8da' : '#9eb0d6')} ;


`
const MessageBox = styled.div`
   margin: 5px 10px;
   display: flex;
   flex-direction: column;
`
const NotificationType = styled.span`
   padding: 5px 7px;
   border-radius: 10px;
   border: 1px solid black ;
   `


const Img = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    `

const Message = styled.span`
font-size: 18px;
 font-weight:${(({ seen }) => seen ? '300' : 'bold')} ;
 color:${(({ seen }) => seen ? '#717171' : 'black')} ;
   
`
const LeftBox = styled.div`
display: flex;
`
const RightBox = styled.div`

`
const Title = styled.span`
    font-size: 32px;
    font-weight: bold;
`
const Container = styled.div`
    margin-top: 80px;
    display: flex;
    
    justify-content: center;
    align-items: center;
`
const Hr = styled.hr`
    width: 100%;
    height: 2px;
    background-color: #C9F7FF;
`
const Time = styled.time`
font-size: 16px;
color: #717171;
font-weight: 300;
`
const NotificationContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
`
const Notification = () => {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleNotification = (id) => {
        axios.patch(`/api/user/notification/${id}`, { seen: true }).then((data) => {
            console.log('updated notification', data.data)
            dispatch(updateNotification(data.data))
        }).catch((err) => console.log(err))
    }
    const handleDelete = (id) => {
        console.log('delete button clicked')
        axios.delete(`/api/user/notification/${id}`).then((data) => {
            dispatch(deleteNotification(id))
        }).catch((err) => console.log(err))
    }
    console.log('notif', user?.notifications)
    return (
        <>
            <Navbar />
            <Container>
                <NotificationContainer>
                    <Title>Notifications</Title>
                    {user?.notifications.length > 0 ? [...user?.notifications].sort((a, b) => new Date(b?.time) - new Date(a?.time)).map((notification, i) => (
                        <>

                            <NotificationCard key={i} >
                                <LeftBox>
                                    <Img src={avatar} />
                                    <Link to={`/${notification?.notificationType}/${notification?.messageId}`} onClick={() => handleNotification(notification?._id)}>
                                        <MessageBox>
                                            <Message seen={notification?.seen}>{notification?.message}</Message>
                                            {/* <NotificationType>{notification?.notificationType}</NotificationType> */}
                                            <Time>{notification?.time && formatDistance(new Date(notification?.time), new Date(Date.now()), { addSuffix: true })}</Time>
                                        </MessageBox>
                                    </Link>



                                </LeftBox>
                                <RightBox>

                                    <ClearIcon onClick={() => handleDelete(notification?._id)} />

                                </RightBox>

                            </NotificationCard>
                            <Hr />
                        </>

                    )) : <p>no notification</p>}
                </NotificationContainer>
            </Container></>
    )
}

export default Notification