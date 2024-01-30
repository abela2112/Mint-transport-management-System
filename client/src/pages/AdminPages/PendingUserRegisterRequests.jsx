import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getAllUserApi } from '../../api/userApi';
import { Title } from '../StaffManagerPages/StaffMangerPendingRequests';
import AdminTable from './AdminTable';
import { Container } from './ShowAllUserForAdmin';

const PendingUserRegisterRequests = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['users', 'pending'],
    queryFn: getAllUserApi,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
  console.log('data', data)
  const filteredData = data?.data.filter((request) => request?.status === 'pending')

  console.log('filteredData', filteredData)
  return (
    <Container>
      <Title>Pending User Requests</Title>
      <AdminTable isLoading={isPending} rows={filteredData} />
    </Container>
  )
}

export default PendingUserRegisterRequests