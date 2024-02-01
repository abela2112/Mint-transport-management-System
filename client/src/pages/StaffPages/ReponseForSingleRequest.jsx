import { Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Center from '../../components/Center'
import Loader from '../../components/Loader'
import { Title } from '../Register/RegisterCSS'
import { Info } from './SinglResponsePage'
const ReponseForSingleRequest = () => {
    const { id } = useParams()
    const { data, isPending, error } = useQuery({
        queryKey: ['response', id],
        queryFn: () => axios.get(`/api/TMresponse/request/${id}`),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 3
    })
    const response = data?.data
    console.log('error', error)
    if (isPending) return <Loader />
    if (!response) return <Center>No Response </Center>
    return (
        <Container>
            <div style={{ backgroundColor: '#fff', padding: '10px' }}>
                <Title>Response detail</Title>
                <Info response={response} />
            </div>
        </Container>
    )
}

export default ReponseForSingleRequest