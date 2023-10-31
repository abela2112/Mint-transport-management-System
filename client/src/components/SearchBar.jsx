import React from 'react'
import styled from 'styled-components'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
const Container = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 20px;
    margin-top: 10px;
`
const Title = styled.span``
const Select = styled.select``
const Option = styled.option``
const Input = styled.input`
flex: 2;
color:#54577A;
padding: 10px;
border: none;
`
const SearchBox = styled.div` 
border: 1px solid #F5F5F7;
display: flex;
align-items: center;
justify-content: space-between;
border-radius: 5px;
width: 400px;
`
const SortingBox = styled.div`
border: 1px solid #F5F5F7;
display:flex;
align-items: center;
padding: 5px;

`
const SearchBar = () => {
    return (
        <Container>
            <SearchBox>
                <Input type='text' placeholder='search request...' />
                <SearchOutlinedIcon style={{margin:'0 5px' ,}} />
            </SearchBox>
            <SortingBox>
                <FilterListOutlinedIcon />
                <Title>Sort BY:</Title>
                <Select>
                    <Option>ASC</Option>
                    <Option>DES</Option>
                </Select>
            </SortingBox>
        </Container>
    )
}

export default SearchBar