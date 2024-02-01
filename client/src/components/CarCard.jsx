import React from 'react'
import styled from 'styled-components'
import { useTranslation } from "react-i18next"
const Container = styled.div`
    padding: 10px;
    display: flex;
   // flex-direction: column;
   justify-content:center;
    flex-wrap:wrap;
    margin:5px;
`
const CarDetail = styled.div`
  display:flex;
  padding:20px;
  align-items:left;
  border: 1px solid #ccc;
  flex-direction:column;
  border-radius: 10px;
  width:100%;
  height:100%;
`
const DetailContainer=styled.div`
     display: flex;
     align-items:center;
    // justify-content:center;
     flex-direction:column;
     height:400px;
     width:300px;
    // background-color:yellow;
     border: 1px solid #ccc;
     border-radius: 10px;
`

const ImageContainer = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
border-radius: 10px;
`
const Brand=styled.div`
`
const Model=styled.div`
`
const LicencePlateNumber=styled.div`
`
const CarCard = ({ data }) => {
  const {t}=useTranslation('global')
    return (
        <Container>
          <DetailContainer>
            <ImageContainer src='https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=1772&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            <CarDetail>
                  <Brand> <b>{t("CarCard.brand")}</b>{data.brand}</Brand>
                  <Model> <b>{t("CarCard.model")} </b>{data.model}</Model>
                  <LicencePlateNumber> <b>{t("CarCard.plateNumber")}</b>{ data.licencePlateNumber}</LicencePlateNumber>
            </CarDetail>
         </DetailContainer>
        </Container>
    )
}

export default CarCard