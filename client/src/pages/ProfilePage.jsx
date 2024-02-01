import React from 'react'
import { useTranslation } from "react-i18next"
import { Img1, ImgmintContainer, Title } from './Register/RegisterCSS'
import { Container, Wrraper } from './StaffPages/MakeRequest'
import styled from 'styled-components'
import { Box, Content, InfoContainer } from '../components/SingleRequestDetails'
import { avatar } from '../asset'
const FlexBetween = styled.div`
display: flex;
justify-content: space-between;
`
// const Box = styled.div``

const Profile = () => {
    const { t } = useTranslation('global')
    return (
        <Container>
            <Wrraper>

                <FlexBetween>

                    <ImgmintContainer>
                        <Img1 src={avatar} />

                    </ImgmintContainer>
                    <InfoContainer>
                        <Title>{t("Profile.profile")}</Title>
                        <Box>
                            <span>First Name</span>
                            <Content>Abel</Content>
                        </Box>
                        <Box>
                            <span>Last Name</span>
                            <Content>Ayalew</Content>
                        </Box>
                        <Box>
                            <span>Email</span>
                            <Content>abela9326@Mint.gov.et</Content>
                        </Box>
                        <Box>
                            <span>Phone Number</span>
                            <Content>+251 933017499</Content>
                        </Box>
                        <Box>
                            <span>Position</span>
                            <Content>Abel AYALEW</Content>
                        </Box>
                        <Box>
                            <span>Department</span>
                            <Content>Abel AYALEW</Content>
                        </Box>



                    </InfoContainer>
                </FlexBetween>

            </Wrraper>

        </Container>
    )
}

export default Profile