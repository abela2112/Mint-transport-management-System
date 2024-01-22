import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from "react-i18next"
const Container = styled.div`
padding: 20px;
margin-top: 10px;
`
const SearchPage = () => {
    const {t}=useTranslation('global')
    const { searchTerm } = useParams()
    console.log(searchTerm)
    return (
        <Container>{t("SearchPage.searchPage")}</Container>
    )
}

export default SearchPage