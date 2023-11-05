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
    padding: 10px 20px;
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
// const SearchBox = styled.div` 
// border: 1px solid #F5F5F7;
// display: flex;
// align-items: center;
// justify-content: space-between;
// border-radius: 5px;
// width: 400px;
// `
const SortingBox = styled.div`
border: 1px solid #F5F5F7;
display:flex;
align-items: center;
padding: 5px;

`

const FilterBox = styled.div`
display: flex;
align-items: center;
`
const SearchBar = ({ sortingTerm, setSortingTerm, filters, setFilters }) => {
    console.log(filters)
    return (
        <Container>
            {/* <SearchBox>
                <Input type='text' placeholder='search request...' />
                <SearchOutlinedIcon style={{margin:'0 5px' ,}} />
            </SearchBox> */}
            <FilterBox>
                <FilterListOutlinedIcon style={{ marginRight: '5px' }} />
                <Title>Status:</Title>
                <Select value={filters} defaultValue={'approved'} onChange={(e) => setFilters(e.target.value)} >

                    <Option value={'approved'}>approved</Option>
                    <Option value={'rejected'}>rejected</Option>
                </Select>
            </FilterBox>
            <SortingBox>

                <Title>Sort BY:</Title>
                <Select value={sortingTerm} defaultValue={'ASC'} onChange={(e) => setSortingTerm(e.target.value)}>
                    <Option value={'ASC'}>ASC</Option>
                    <Option value={'DES'}>DES</Option>
                </Select>
            </SortingBox>
        </Container>
    )
}

export default SearchBar