
import React, { useEffect, useState } from 'react'
import RequestsTable from './RequestsTable'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../../components/Loader'
const History = () => {

    const [notPendingRequests, setNotPendingRequests] = useState([])
    const [requests, setRequests] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`/api/request?department=${user?.department}`).then(({ data }) => {
            setRequests(data.data)
            setNotPendingRequests(data?.data.filter(request => request.status !== 'pending' && request))
            setIsLoading(false)
        }).catch((err) => {
            console.log(err)
            setIsLoading(false)
        })
    }, [])

    console.log(requests)
    console.log("notPendingRequests", notPendingRequests)
    if (isLoading) return <Loader />
    return (
        <RequestsTable title={"History"} rows={notPendingRequests && notPendingRequests} />
    );
}
export default History