import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getRequestSuccess } from '../../redux/features/request'
import RequestsTable from './RequestsTable'
import Loader from '../../components/Loader'
export const Title = styled.span`
font-size:24px;
font-weight: 500;
margin-bottom: 20px;
color: #000;
text-transform: capitalize;
`
const Container = styled.div`
    padding: 20px;
    margin-top: 10px;
`
export const Button = styled.button`
    padding: 5px 10px;
    border:none;
    border-radius:10px;
    background-color: #3bb077;
    color: #fff;
    cursor:pointer;
    margin-right: 20px;

`


const StaffMangerPendingRequests = () => {
    // const { requests } = useSelector(state => state.request)

    const [requests, setRequests] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useSelector((state) => state.user);


    useEffect(() => {
        setIsLoading(false)
        axios.get(`/api/request?department=${user?.department}`).then(({ data }) => {
            setRequests(data?.data.filter((req) => req.status === 'pending'))
            setIsLoading(false)
        }).catch((err) => {
            console.log(err)
            setIsLoading(false)
        })
    }, [])
    console.log(requests)

    if (isLoading) return <Loader />
    return (
        <RequestsTable title={"Pending Requests"} rows={requests && requests} />
    );
}


export default StaffMangerPendingRequests