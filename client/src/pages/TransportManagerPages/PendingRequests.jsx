import { useTranslation } from "react-i18next"
import { getAllRequests } from "../../api/userApi"
import Loader from "../../components/Loader"
import RequestsTable from "../StaffManagerPages/RequestsTable"
import { useQuery } from '@tanstack/react-query'
const PendingRequests = () => {
    const { t } = useTranslation('global')
    const { data, error, isPending } = useQuery({
        queryKey: ['carrequest', 'pending'],
        queryFn: getAllRequests,
        staleTime: 1000 * 60 * 5
    })
    
    let filterdRequest
    if (isPending) return <Loader />
    if (data?.data.length > 0) {
        filterdRequest = data.data.filter((request) => request.status === "pending")

    }
    return (
        <RequestsTable title={t("AllRequests.pendingRequests")} rows={filterdRequest} />
    )
}

export default PendingRequests