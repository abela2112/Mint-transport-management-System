import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRequestById, updateRequestById } from '../api/userApi'
import styled from 'styled-components'
import { format } from 'date-fns'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'
import { Button } from './UserRegisterRequest'
import TransportManagerResponse from '../components/TransportManagerResponse'
const Container = styled.div`
    padding: 20px;
`
const Wrapper = styled.div`
display: flex;
flex-direction: column;
    
`
const ButtonContainer = styled.div``
const ApproveButton = styled.button`
padding: 7px 10px;
border: none;
margin: 10px 20px;
background-color:#e5faf2;

&:disabled{
    cursor: not-allowed;
}
cursor:pointer;
`
const RejectButton = styled.button`
padding: 7px 10px;
border: none;
margin: 10px 20px;
background-color: '#fff0f1';
cursor: pointer;
&:disabled{
    cursor: not-allowed;
}
`
const Text = styled.span`
padding: 10px;
`
const SingleRequestDetails = () => {
    const role = useSelector(state => state.user?.role)
    const [isOpen, setIsOpen] = useState(false)
    const handleApprove = (e) => {
        e.preventDefault()
        if (role === 'transport-manager') {
            setIsOpen(true)
            
        }
        else {
            updateRequestById(id, { isChecked: true }).then(() => console.log('approved successfully')).catch((err) => console.log(err));

        }
    }

    const handleReject = (e) => {
        e.preventDefault()
        updateRequestById(id, { isChecked: false, status: 'rejected' }).then(() => console.log('rejected successfully')).catch((err) => console.log(err));
    }
    const [request, setRequest] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        setIsLoading(true)
        getRequestById(id).then(({ data }) => {
            setIsLoading(false)
            console.log('single request', data)
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
                <Text>Pick Up date:{request?.pickUpDate && format(new Date(request?.pickUpDate)
                    , 'MMMM do yyyy')}</Text>
                <Text>return date:{request?.pickUpDate && format(new Date(request?.pickUpDate)
                    , 'MMMM do yyyy')}</Text>


            </Wrapper>
            <ButtonContainer>
                {role === 'staff-manager' || role === 'transport-manager' ?
                    <>
                        <ApproveButton disabled={request?.status === 'approved' || request?.status === 'rejected' ? true : false} onClick={handleApprove} >Approved</ApproveButton>
                        <RejectButton disabled={request?.status === 'rejected' || request?.status === 'approved' ? true : false} onClick={handleReject}>Reject</RejectButton>
                    </> : <Button style={{ cursor: 'not-allowed' }} disabled type={request?.status} >{request?.status}</Button>}
            </ButtonContainer>
            <TransportManagerResponse open={isOpen} setOpen={setIsOpen}/>
        </Container>
   )
 }

export default SingleRequestDetails