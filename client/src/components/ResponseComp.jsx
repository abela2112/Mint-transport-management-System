import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const ResponseComp = ({ data }) => {

    return (
        <Link to={`/response/${data?._id}`}>{data?._id}</Link>
    )
}

export default ResponseComp