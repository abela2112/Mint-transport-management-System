import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchBar from '../components/SearchBar'
import { getAllRequests } from '../api/userApi'
import SingleRequest from './SingleRequest'
import axios from 'axios'
const Container = styled.div`
    padding: 20px;
    margin-top: 10px;
`
const History = () => {
    const [requests, setRequests] = useState([])
    const [sortingTerm, setSortingTerm] = useState('')
    const [filters, setFilters] = useState('approved')
    const [filteredRequest, setFilteredRequest] = useState([])

    useEffect(() => {
        axios.get(`/api/request?checked=true`).then(({ data }) => {
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
    return (<>
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

export default History

