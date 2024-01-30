import styled from 'styled-components'
const ItemCenter = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`
const Center = ({ children }) => {
    return (
        <ItemCenter>{children}</ItemCenter>
    )
}

export default Center