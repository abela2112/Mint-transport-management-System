import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
const Container = styled.div`
padding: 20px;
margin-top: 10px;
`
const SearchPage = () => {
    const { searchTerm } = useParams()
    console.log(searchTerm)
    return (
        <Container>SearchPage</Container>
    )
}

export default SearchPage