import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllRequests } from '../../api/userApi';
import { useQuery } from '@tanstack/react-query';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StatusButton } from '../../components/Buttons';
import { getRequestSuccess } from '../../redux/features/request';
import { Title } from '../StaffManagerPages/StaffMangerPendingRequests';
import Loader from '../../components/Loader';
import RequestsTable from '../StaffManagerPages/RequestsTable';
import { useTranslation } from 'react-i18next';

const AllRequests = () => {
    const { t } = useTranslation('global')
    const { data, error, isPending } = useQuery({
        queryKey: ['carrequest'],
        queryFn: getAllRequests,
        staleTime: 1000 * 60 * 5
    })
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [filteredReq, setFilteredReq] = useState([])
    // useEffect(() => {
    //     getAllRequests().then(({ data }) => {
    //         dispatch(getRequestSuccess(data.data))
    //     }).catch((err) => console.log(err))
    //     if (type === 'pending') {
    //         console.log(filteredReq)
    //         setFilteredReq([...requests].filter((request) => request.status === 'pending'))
    //     }
    //     else {
    //         setFilteredReq(requests)
    //     }
    // }, [type])

   

    if (isPending) return <Loader />
    return (

        <RequestsTable title={t("AllRequests.title")} rows={data?.data} />
    );
}
export default AllRequests