import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FlexBetween } from '../ProfilePage'
import { StatusButton } from '../../components/Buttons'
const Container = styled.div`

width: 90%;
background-color: white;
padding: 20px;
margin-bottom: 10px;

@media screen and (max-width: 768px) {
   width:100% ;
}

`
const SingleRequest = ({ request: { _id, description, destination, createdAt, status } }) => {
    return (
        <Link to={`/request/${_id}`}>
            <Container>
                <FlexBetween>
                    <div style={{ flex: 2 }}>{description} </div>
                    <div style={{ flex: 1 }}>{destination}</div>
                    <div style={{ flex: 1 }}> <StatusButton type={status} >{status}</StatusButton></div>
                    <div style={{ flex: 1 }}>

                        <span style={{ fontSize: "14px" }}> {new Date(createdAt).toDateString()}</span></div>

                </FlexBetween>
            </Container>
        </Link>
    )
}

export default SingleRequest