import React from 'react'
import { useTranslation } from "react-i18next"
import { Img1, ImgmintContainer, Title } from './Register/RegisterCSS'
import { Container, Wrraper } from './StaffPages/MakeRequest'
import styled from 'styled-components'
import { Box, Content, InfoContainer } from '../components/SingleRequestDetails'
import { avatar } from '../asset'
import { useQuery } from '@tanstack/react-query';
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'
import { getSingleUser } from '../api/userApi'

export const FlexBetween = styled.div`
display: flex;
justify-content: space-between;
gap: 1rem;
@media screen and (max-width: 768px) {
    flex-direction: column;
}
`

const Profile = () => {
    const { t } = useTranslation('global')
    const { user } = useSelector((state) => state.user);
    const { data, isPending, error } = useQuery({
        queryKey: ['profile', user._id],
        queryFn: () => getSingleUser(user?._id),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 3
    })
    const response = data?.data
    if (isPending) return <Loader />
    if (error) return <p>Something went Wrong</p>
    return (
        <Container>
            <Wrraper>
                <FlexBetween>
                    <ImgmintContainer>
                        <Img1 src={response.profile ? response?.profile : avatar} />

                    </ImgmintContainer>
                    <InfoContainer>
                        <Title>{t("Profile.profile")}</Title>
                        <Box>
                            <span>First Name</span>
                            <Content>{response.firstName}</Content>
                        </Box>
                        <Box>
                            <span>Last Name</span>
                            <Content>{response?.lastName}</Content>
                        </Box>
                        <Box>
                            <span>Email</span>
                            <Content>{response?.email}</Content>
                        </Box>
                        <Box>
                            <span>Phone Number</span>
                            <Content>{response.phoneNumber}</Content>
                        </Box>
                        <Box>
                            <span>Position</span>
                            <Content>{response.position}</Content>
                        </Box>
                        <Box>
                            <span>Department</span>
                            <Content>{response.department}</Content>
                        </Box>
                        <Box>
                            <span>Role</span>
                            <Content>{response.role}</Content>
                        </Box>



                    </InfoContainer>
                </FlexBetween>

            </Wrraper>

        </Container>
    )
}

export default Profile