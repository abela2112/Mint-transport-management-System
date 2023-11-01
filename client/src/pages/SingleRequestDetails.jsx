import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRequestById, updateRequestById } from '../api/userApi'
import styled from 'styled-components'
import { format } from 'date-fns'
import Loader from '../components/Loader'
const Container = styled.div`
    padding: 20px;
`
const Wrapper = styled.div`
    
`
const ButtonContainer = styled.div``
const ApproveButton = styled.button``
const RejectButton = styled.button``
const Text = styled.span``
const SingleRequestDetails = ({}) => {
    const handleApprove = (e) => {
        e.preventDefault()
        updateRequestById(id, { status: 'approved' }).then(() => console.log('approved successfully')).catch((err) => console.log(err));
    }
    const handleReject = (e) => {
        e.preventDefault()
        updateRequestById(id, { status: 'rejected' }).then(() => console.log('rejected successfully')).catch((err) => console.log(err));
    }
    const [request, setRequest] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        setIsLoading(true)
        getRequestById(id).then(({ data }) => {
            setIsLoading(false)
            setRequest(data)
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
    }, [id])
    if (isLoading) return <Loader />
    console.log(request)
    return (
        <Container>

            <Wrapper>
                <Text>Full Name:{request?.name}</Text>
                <Text>destination:{request?.destination}</Text>
                <Text>Phone Number:{request?.phoneNumber}</Text>
                <Text> description:{request?.description}</Text>
                <Text>Pick Up date:{format(new Date(request?.pickUpDate)
                    , 'MMMM do yyyy')}</Text>
                <Text>return date:{format(new Date(request?.pickUpDate)
                    , 'MMMM do yyyy')}</Text>


            </Wrapper>
            <ButtonContainer>
                <ApproveButton onClick={handleApprove} >Approved</ApproveButton>
                <RejectButton onClick={handleReject}>Reject</RejectButton>
            </ButtonContainer>

        </Container>
    )
}

export default SingleRequestDetails