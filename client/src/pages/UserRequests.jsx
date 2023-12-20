// import React, { useEffect, useState } from 'react'
// import { getUserRequests } from '../api/userApi'
// import { useSelector } from 'react-redux'
// import styled from 'styled-components'
// import SingleRequest from './SingleRequest'
// import SearchBar from '../components/SearchBar'
// import { swipeUp } from './ShowAllUserForAdmin'
// const Container = styled.div`
//     margin-top: 20px;
//     padding: 20px;
//     transition: all 0.3 ease-in-out;
//     animation:${swipeUp} 2s ease-out ;
// `
// const UserRequests = () => {
//     const [requests, setRequests] = useState([])
//     const user = useSelector(state => state.user.user)
//     const [sortingTerm, setSortingTerm] = useState('')
//     const [filters, setFilters] = useState('approved')
//     const [filteredRequest, setFilteredRequest] = useState([])


//     useEffect(() => {
//         getUserRequests(user?._id).then(({ data }) => {
//             setRequests(data)
//             console.log(data)
//         }).catch((err) => console.log(err))
//     }, [user])
//     useEffect(() => {
//         sortingTerm && sortingTerm === 'ASC' ? setRequests((requests) => requests?.toSorted((a, b) => new Date(a?.pickUpDate) - new Date(b?.pickUpDate))) : setRequests((requests) => requests?.toSorted((a, b) => new Date(b?.pickUpDate) - new Date(a?.pickUpDate)))
//     }, [sortingTerm])


//     useEffect(() => {
//         filters && setFilteredRequest([...requests].filter((request) => request?.status === filters))
//     }, [filters, requests])
//     console.log(filters)
//     return (<>
//         <SearchBar sortingTerm={sortingTerm} setSortingTerm={setSortingTerm} filters={filters} setFilters={setFilters} />

//         <Container>
//             {
//                 filters ? (filteredRequest.length > 0 ? filteredRequest.map((request, i) => (
//                     <SingleRequest request={request} key={i} />
//                 )) : (<p>no results found</p>)) : requests.length > 0 && requests.map((request, i) => (
//                     <SingleRequest request={request} key={i} />
//                 ))
//             }
//         </Container>
//     </>
//     )
// }



// export default UserRequests