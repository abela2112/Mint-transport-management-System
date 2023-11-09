import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CarCard from '../components/CarCard'
const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const Container = styled.div`
padding :20px;`

const Title = styled.span``
const AvailableCar = () => {
    const [cars, setCars] = useState([])
    useEffect(()=>{
        axios.get(`/api/car`).then(({ data }) => {
            setCars(data)
        }).catch(err => console.log(err));
    },[])
    console.log(cars)

    return (
        <Container>
            <Title>Available car</Title>
            <Wrapper>
                {cars.length > 0 && cars.filter((car)=>car?.status==='available').map((car, i) => (
                    <CarCard key={i} data={car} />
                ))}
            </Wrapper>
        </Container>
    )
}

export default AvailableCar


