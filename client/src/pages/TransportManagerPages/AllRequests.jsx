import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getAllRequests } from '../../api/userApi';
import Loader from '../../components/Loader';
import RequestsTable from '../StaffManagerPages/RequestsTable';

const AllRequests = () => {
    const { t } = useTranslation('global')
    const { data, error, isPending } = useQuery({
        queryKey: ['carrequest'],
        queryFn: getAllRequests,

        staleTime: 1000 * 60 * 5,
        retry: 3,
    })

    if (isPending) return <Loader />
    if (error) return <p>Something went Wrong please try again!!!</p>
    return (

        <RequestsTable title={t("AllRequests.title")} rows={data?.data} />
    );
}
export default AllRequests