import React from 'react'
import styled from 'styled-components'
import { LoaderForButton } from './Loader'
const Cancel = styled.button`
  transition: all .3s ease-in-out;
  border-radius:5px;
  color:white;
  width:200px;
  height:40px;
  font-size:18px;
  outline: #b7b5b5;
  cursor:pointer;
  color: black;
  &:hover{
        box-shadow: 0px 0px 5px 0px rgba(173, 174, 174, 0.75);
       }
`
export const StatusButton = styled.button`
border:none;
padding:7px;
width: 150px;
border-radius: 10px;
background-color: ${({ type }) => type === 'approved' && '#e5faf2'};
background-color: ${({ type }) => type === 'rejected' && '#fff0f1'};
background-color: ${({ type }) => type === 'pending' && '#ebf1fe'};
 
color: ${({ type }) => type === 'approved' && '#3bb077'};
color: ${({ type }) => type === 'rejected' && '#d95087'};
color: ${({ type }) => type === 'pending' && '#3bb077'};
`
const Submit = styled.button`
  transition: all .3s ease-in-out;
  border-radius:10px;
  width:200px;
  color:white;
  height:40px;
  font-size:18px;
  cursor:pointer;
  background-color: rgb(255, 165, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover{
    font-size:18px;
    box-shadow: 0px 0px 18px 0px rgba(255, 165, 0, 0.75);
    -webkit-box-shadow: 0px 0px 18px 0px rgba(255, 165, 0, 0.75);
    -moz-box-shadow: 0px 0px 18px 0px rgba(255, 165, 0, 0.75);

  }

  @media screen and (max-width:768px) {
    
  }
`
export const SubmitButton = ({ isLoading, title }) => {
  return (
    <Submit type='submit' disabled={isLoading}>
      {isLoading ? <LoaderForButton /> : title}
    </Submit>
  )
}

export const CancelButton = ({ onClick }) => {
  return <Cancel type='button' onClick={onClick}>cancel</Cancel>
}
