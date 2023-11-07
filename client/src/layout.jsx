import React from 'react'
import SideBar from './components/SideBar'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from './components/Navbar'
import { useSelector } from 'react-redux'
const Container = styled.div`
display: flex;
width: 100%;
height: 100%;
`
const Main = styled.div`
flex: 4;
`
const InnerContainer = styled.div`
margin-top:60px;`

const Layout = () => {
    const user = useSelector(state => state.user)
    return (
        <Container>
            <SideBar />
            <Main>

                <Navbar title={`${user?.firstName} ${user?.lastName}`} />
                <InnerContainer>
                    <Outlet />
                </InnerContainer>


            </Main>
        </Container>
    )
}

export default Layout