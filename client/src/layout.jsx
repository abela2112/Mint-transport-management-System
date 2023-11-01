import React from 'react'
import SideBar from './components/SideBar'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from './components/Navbar'
const Container = styled.div`
display: flex;
width: 100%;
height: 100%;
`
const Main = styled.div`
flex: 4;
`
const Layout = () => {
    return (
        <Container>
            <SideBar />
            <Main>
                <Navbar />
                <Outlet />
            </Main>
        </Container>
    )
}

export default Layout