import React, { useEffect, useState } from 'react'
import { getAllRequests } from '../api/userApi'
import styled from 'styled-components'
import SingleRequest from './SingleRequest'
import SearchBar from '../components/SearchBar'
const Container = styled.div`
    margin-top: 20px;
    padding: 20px;
`
const AllRequests = () => {
    const [requests, setRequests] = useState([])
    const [sortingTerm, setSortingTerm] = useState('')
    const [filters, setFilters] = useState('pending')
    const [filteredRequest, setFilteredRequest] = useState([])
    useEffect(() => {
        getAllRequests().then(({ data }) => {
            setRequests(data)
        }).catch((err) => console.log(err))
    }, [])
    useEffect(() => {
        sortingTerm && sortingTerm === 'ASC' ? setRequests((requests) => requests?.toSorted((a, b) => new Date(a?.pickUpDate) - new Date(b?.pickUpDate))) : setRequests((requests) => requests?.toSorted((a, b) => new Date(b?.pickUpDate) - new Date(a?.pickUpDate)))
    }, [sortingTerm])


    useEffect(() => {
        filters && setFilteredRequest([...requests].filter((request) => request?.status === filters))
    }, [filters, requests])
    console.log(filters)
    return (
        <>
            <SearchBar sortingTerm={sortingTerm} setSortingTerm={setSortingTerm} filters={filters} setFilters={setFilters} />

        <Container>
                {filters ? (
                    filteredRequest.length > 0 ?
                        filteredRequest.map((request, i) => (
                            <SingleRequest request={request} key={i} />
                        )) : <p>no rusults found</p>) :
                    (requests.length > 0 && requests.map((request, i) => (
                        <SingleRequest request={request} key={i} />
                    )))}
        </Container>
        </>
    )
}

export default AllRequests