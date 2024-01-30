import React from 'react'
import styled from 'styled-components'
const ErrorText = styled.p`
    color: red;
`
const ErrorMessage = ({ children }) => {
    if (!children) return null
    return (
        <ErrorText>{children}</ErrorText>
    )
}

export default ErrorMessage