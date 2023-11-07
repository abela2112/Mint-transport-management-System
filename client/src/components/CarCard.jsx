import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
    padding: 10px;
  
    display: flex;
    flex-direction: column;
    margin:5px;

`
const CarDetail = styled.div`

`
const ImageContainer = styled.img`
width: 200px;
height: 200px;
object-fit: cover;
border-radius: 10px;
`
const CarCard = ({ data }) => {
    return (
        <Container>
            <ImageContainer src='https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=1772&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            <CarDetail>cardetail</CarDetail>
        </Container>
    )
}

export default CarCard