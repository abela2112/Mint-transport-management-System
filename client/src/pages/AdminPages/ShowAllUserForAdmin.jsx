import {
  useQuery,
} from "@tanstack/react-query";
import axios from 'axios';
import { getAllUserApi } from '../../api/userApi';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { deleteuser } from '../../redux/features/userlist';

import { Title } from '../StaffManagerPages/StaffMangerPendingRequests';
import AdminTable from './AdminTable';
export const EditButton = styled.button`
  padding: 5px 10px;
  margin-right: 5px;
  color: white;
  background-color: #57b057;
  cursor: pointer;
  border-radius: 10px;
`


const TableContainer = styled.div`
  .table-cell {
    font-size: 18px;
  }
`;



export const Container = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
    transition: all 0.3s ease-out;
    background: #fff;
`

export default function ShowAllUserForAdmin() {
  const { isPending, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUserApi,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const dispatch = useDispatch()
  const handleDelete = (id) => {
    axios.delete(`/api/user/${id}`).then(({ data }) => {
      console.log(data)
      dispatch(deleteuser(id))
    }).catch((err) => console.log(err))
  }
  console.log('data', data)

  return (
    <Container>
      <Title>All users</Title>
      <AdminTable isLoading={isPending} rows={data?.data} />
    </Container>
  );
}
