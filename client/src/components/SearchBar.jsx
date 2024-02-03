import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
const Container = styled.div`
    height: auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;

    margin-top: 10px;
    background-color: #fff;

    @media screen and (max-width: 768px) {
       flex-direction :column ;
       gap: 1rem;
       align-items: flex-start;
    }
`
const Title = styled.span``
const Select = styled.select`
border: none;
outline: none;
&:focus{
    outline: none;
}
`
const Option = styled.option``
const SortingBox = styled.div`

display:flex;
align-items: center;
padding: 5px;
border: 2px solid #000;
border-radius:10px;

`

const FilterBox = styled.div`
display: flex;
align-items: center;
border: 2px solid #000;
padding: 5px;
border-radius:10px;
`
const SearchBar = ({ sortingTerm, setSortingTerm, filters, setFilters }) => {
    const {t}=useTranslation('global')
    console.log(filters)
    return (
        <Container>
            <FilterBox>
                <FilterListOutlinedIcon style={{ marginRight: '5px' }} />
                <Title>{t("SearchBar.status")}</Title> 
                <Select value={filters} defaultValue={'pending'} onChange={(e) => setFilters(e.target.value)} >
                    <Option value={'pending'}>{t("SearchBar.pending")}</Option>
                    <Option value={'approved'}>{t("SearchBar.approved")}</Option>
                    <Option value={'rejected'}>{t("SearchBar.rejected")}</Option>
                </Select>
            </FilterBox>
            <SortingBox>

                <Title>{t("SearchBar.sortBy")}</Title>
                <Select value={sortingTerm} defaultValue={'ASC'} onChange={(e) => setSortingTerm(e.target.value)}>
                    <Option value={'ASC'}>{t("SearchBar.asc")}</Option>
                    <Option value={'DES'}>{t("SearchBar.des")}</Option>
                </Select>
            </SortingBox>
        </Container>
    )
}

export default SearchBar