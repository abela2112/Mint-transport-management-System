import React from 'react'
import { SideBar } from './pages/SideBar'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from './pages/Navbar'
import { useSelector } from 'react-redux'
import { CopyRight } from './pages/Register/RegisterCSS'
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

@media screen and (max-width:768px){
    margin-left: 0.5rem;
    overflow-x:auto !important;
   }


`
const InnerContainer = styled.div`
margin-top:60px;
background-color:#f5f5f5;
width: 100%;
padding: 0 5px 5px 0px;
height: 100%;
overflow-y: auto;


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

                    <CopyRight>
                        <small>mint&copy;2023 All right reserved</small>
                    </CopyRight>
                </InnerContainer>
            </Main>
        </Container>
    )
}

export default Layout