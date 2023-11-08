import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { UserRequestResponseapi } from '../api/userApi'
import ResponseComp from '../components/ResponseComp'
import { getResponseSuccess } from '../redux/features/response'

const Response = () => {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [responses, setResponses] = useState('')
    useEffect(() => {
        UserRequestResponseapi(user?._id).then(({ data }) => {
            setResponses(data)
            console.log('>>', data)
            dispatch(getResponseSuccess(data))
        }).catch((err) => console.log(err))
    }, [user])
    console.log(responses)

    return (
        <div>
            {responses.length > 0 && responses.map((response, i) => (<ResponseComp data={response} key={i} />))}
        </div>
    )
}

export default Response