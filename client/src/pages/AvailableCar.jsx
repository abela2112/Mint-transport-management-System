import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
const Container = styled.div`
padding :20px;`

const Title = styled.span``
const AvailableCar = () => {
    const [cars, setCars] = useState([])
    useEffect(()=>{
        axios.get(`/api/car`)
    },[])
    return (
        <Container>
            <Title>Available car</Title>
            { }
        </Container>
    )
}

export default AvailableCar


