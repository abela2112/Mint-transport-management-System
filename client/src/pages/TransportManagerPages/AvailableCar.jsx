import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CarCard from '../../components/CarCard'
import { getAvailableCar } from '../../api/userApi'

import { useTranslation } from "react-i18next"

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const Container = styled.div`
padding :20px;`

const Title = styled.span``
const AvailableCar = () => {
    const {t}=useTranslation('global')
    const [cars, setCars] = useState([])
    useEffect(() => {
        // axios.get(`/api/car`).then(({ data }) => {
        //     setCars(data)
        // }).catch(err => console.log(err));
        getAvailableCar().then(({ data }) => {
            setCars(data)
        }).catch((error) => console.log(error))
    }, [])
    console.log(cars)

    return (
        <Container>
            <Title>{t("AvailableCar.availableCar")}</Title>
            <Wrapper>
                {cars.length > 0 && cars.filter((car) => car?.status === 'available').map((car, i) => (
                    <CarCard key={i} data={car} />
                ))}
            </Wrapper>
        </Container>
    )
}

export default AvailableCar


