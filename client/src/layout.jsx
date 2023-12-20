import React from 'react'
import SideBar from './components/SideBar'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from './components/Navbar'
import { useSelector } from 'react-redux'
const Container = styled.div`
display: flex;
width: 100%;
height: 100vh;
background: #f5f5f5;
`
const Main = styled.div`
flex: 4;
margin-left: 16rem;
height: 100%;
position: relative;
overflow:hidden;

`
const InnerContainer = styled.div`
margin-top:60px;
background-color:#f5f5f5;
width: 100%;
padding: 0 20px 20px 20px;
height: 100%;
`

const Layout = () => {
    const { user } = useSelector(state => state.user)
    console.log(user)
    return (
        <Container>
            <SideBar />
            <Main>
                <Navbar />
                <InnerContainer>
                    <Outlet />
                </InnerContainer>
            </Main>
        </Container>
    )
}

export default Layout