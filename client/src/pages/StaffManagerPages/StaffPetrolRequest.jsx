import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import DialogModal from '../../components/DialogModal';
import { LoaderForButton } from '../../components/Loader';
import { Contain, FormContainer, Input } from '../Register/RegisterCSS';
import { TextArea, Wrraper } from '../StaffPages/MakeRequest';
import ErrorMessage from "../../components/ErrorMessage";
// const Container = styled.div`
//   width: 100%;
//   padding: 20px 10px;
//   margin-top: 10px;
// `;

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   text-align:center;
// `;

const FormBox = styled.form`
  display: flex;
//   flex-wrap: wrap;
  flex-direction:column;
`;

const InputItem = styled.div`
   display:flex;
  text-align:left;
  padding:0;
  flex-direction:column;
  margin-top: 10px;
  margin-right: 20px;
  width: 400px;
`;

// const Input = styled.input`
// width: calc(100%);
// padding: 10px;
// margin-bottom: 10px;
// border: 1px solid #ccc;
// border-radius: 5px;
// width: 400px;


// &:hover::before {
//   content: attr(title);
//   position: absolute;
//   top: 100%;
//   left: 50%;
//   transform: translateX(-50%);
//   padding: 8px;
//   background-color: #000;
//   color: #fff;
//   border-radius: 2px;
//   font-size: 12px;
//   white-space: nowrap;
//   pointer-events: none;
// }
// `
const Text = styled.p`

`

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  width: 200px;
  padding: 10px 20px;
  font-size: 16px;
  margin: 20px;
  background-color: #155c68;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #3b808c;
    color: #ee8624;
  }
`;

const Title = styled.h1`

`
const Lable = styled.p`
  padding :0px;

`
const Submit = styled.button`
  transition: all .3s ease-in-out;
  border-radius:10px;
  width:200px;
  color:white;
  height:50px;
  margin:20px 20px;
  font-size:16px;
  cursor:pointer;
  background-color: rgb(255, 165, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  /* box-shadow:0 0 5px yellow,
          0 0 25px yellow; */
  &:hover{
    font-size:18px;
    box-shadow: 0px 0px 18px 0px rgba(255, 165, 0, 0.75);
-webkit-box-shadow: 0px 0px 18px 0px rgba(255, 165, 0, 0.75);
-moz-box-shadow: 0px 0px 18px 0px rgba(255, 165, 0, 0.75);
  }
`

const StaffPetrolRequest = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user)
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [requestDate, setRequestDate] = useState('')
  const [discription, setDiscription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation('global')

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, },
  } = useForm();
  // const handleSubmit = () => {
  //   setIsLoading(true)
  //   postPetrolRequest({ requestDate, discription, name, phoneNumber }).then((data) => {
  //     console.log(data)
  //     setIsLoading(false)
  //     toast.success('Successfully Submited!!')
  //   }).catch((error) => {
  //     console.log(error)
  //     setIsLoading(false)
  //     toast.error("something went Wrong!")
  //   })
  // }
  // useEffect(() => {
  //   setName(user?.firstName + "  " + user?.lastName)
  //   setPhoneNumber(user?.phoneNumber)
  // }, [])

  return (
    <>
      <Wrraper>
        <Title>{t("StaffPetrolRequest.petrolForm")}</Title>
        <FormContainer>
          <Contain>
            <Lable>{t("StaffPetrolRequest.fullName")}</Lable>
            <Input
              type="text"
              defaultValue={`${user?.firstName} ${user?.lastName}`}
              {...register('name', { disabled: true })}
            />
          </Contain>
          <Contain>
            <Lable>{t("StaffPetrolRequest.phoneNumber")}</Lable>
            <Input
              type="tel"
              {...register('phoneNumber', { required: "phone number is required" })}
            />
            <ErrorMessage>{errors.phoneNumber && errors.phoneNumber.message}</ErrorMessage>

          </Contain>
          <Contain>
            <Lable>{t("StaffPetrolRequest.requestDate")}</Lable>
            <Input
              placeholder={t("StaffPetrolRequest.requestDate")}
              type="date"
              {...register('requestDate', {
                required: "request date is Required",
                validate: (fieldvalue) => {
                  const currentDate = new Date().getTime()
                  const newDate = new Date(fieldvalue).getTime()

                  if (newDate < currentDate) {
                    return "invalid date"
                  }
                }
              })}
            />
            <ErrorMessage>{errors.requestDate?.message}</ErrorMessage>

          </Contain>
          <Contain>
            <Lable>{t("StaffPetrolRequest.description")}</Lable>
            <TextArea
              placeholder={t("StaffPetrolRequest.description")}
              {...register('discription',
                { required: "Description is Required" })}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>

          </Contain>
          <Submit onClick={(e) => {
            e.preventDefault()
            setIsOpen(true)
          }}>{isLoading ? <LoaderForButton /> : t("StaffPetrolRequest.submit")}</Submit>
        </FormContainer>
        <Toaster />
      </Wrraper>


      <DialogModal open={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleSubmit} />


    </>

  )
}

export default StaffPetrolRequest