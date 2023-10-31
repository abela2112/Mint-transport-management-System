import React from 'react'
import styled from 'styled-components'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
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
const Navbar = ({title}) => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Title>
                        {title}
                    </Title>
                </Left>
                <Right>
                    <NotificationsActiveOutlinedIcon />
                    <User>
                        <UserName>Abel Ayalew</UserName>
                        <Img src='' />
                    </User>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar