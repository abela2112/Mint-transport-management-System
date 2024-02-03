import React, { useEffect, useState } from 'react'
import { getUserRequests } from '../../api/userApi'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import SingleRequest from './SingleRequest'
import SearchBar from '../../components/SearchBar'
const Container = styled.div`
    height: 100%;

`
const Wrraper = styled.div`
    margin-top: 10px;
    padding: 20px;

`
const UserRequests = () => {
    const [requests, setRequests] = useState([])
    const user = useSelector(state => state.user.user)
    const [isLoading, setIsLoading] = useState(false)
    const [sortingTerm, setSortingTerm] = useState('')
    const [filters, setFilters] = useState('')
    const [filteredRequest, setFilteredRequest] = useState([])


    useEffect(() => {
        setIsLoading(true)
        getUserRequests(user?._id).then(({ data }) => {
            setRequests(data)
            setIsLoading(false)
        }).catch((err) => {
            console.log(err)
            setIsLoading(false)
        })
    }, [user])
    useEffect(() => {
        sortingTerm && sortingTerm === 'ASC' ? setRequests((requests) => requests?.toSorted((a, b) => new Date(a?.pickUpDate) - new Date(b?.pickUpDate))) : setRequests((requests) => requests?.toSorted((a, b) => new Date(b?.pickUpDate) - new Date(a?.pickUpDate)))
    }, [sortingTerm])


    useEffect(() => {
        filters && setFilteredRequest([...requests].filter((request) => request?.status === filters))
    }, [filters, requests])
    if (isLoading) return (<div>loading...</div>)
    return (<Container>
        <SearchBar sortingTerm={sortingTerm} setSortingTerm={setSortingTerm} filters={filters} setFilters={setFilters} />
        <Wrraper >
            {
                filters ? (filteredRequest.length > 0 ? filteredRequest.map((request, i) => (
                    <SingleRequest request={request} key={i} />
                ))
                    :
                    (<p>no results found</p>))
                    : requests.length > 0 && requests.map((request, i) => (
                    <SingleRequest request={request} key={i} />
                ))
            }
        </Wrraper>
    </Container>
    )
}



export default UserRequests