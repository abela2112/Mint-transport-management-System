import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { io } from 'socket.io-client';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast'
import DialogModal from '../../components/DialogModal';
import { LoaderForButton } from '../../components/Loader';
import { Contain, FormContainer, Input } from '../Register/RegisterCSS';
import { TextArea, Wrraper } from '../StaffPages/MakeRequest';
import ErrorMessage from "../../components/ErrorMessage";
import { postPetrolRequest } from "../../api/userApi";
import { SubmitButton } from "../../components/Buttons";

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
  /* background-color: rgb(255, 165, 0); */
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
  const socket = io('http://localhost:5000');
  const { user } = useSelector((state) => state.user);
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
    formState: { errors, },
  } = useForm({
    defaultValues: {
      name: `${user?.firstName} ${user?.lastName}`,
      phoneNumber: user?.phoneNumber,
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      await postPetrolRequest(data)
      socket.emit('sendNotificationToTransportmanager', { notificationType: "petrol request", messageId: data?._id, message: 'new petrol request', from: user?._id });
      toast.success("Successfully created request")
      setIsLoading(false);
      reset()

    } catch (error) {
      toast.error("Failed to create request!")
      setIsLoading(false);
      reset()
    }
  })


  return (
    <>
      <Wrraper>
        <Title>{t("StaffPetrolRequest.petrolForm")}</Title>
        <FormContainer onSubmit={onSubmit}>
          <Contain>
            <Lable>{t("StaffPetrolRequest.fullName")}</Lable>
            <Input
              type="text"
              // defaultValue={`${user?.firstName} ${user?.lastName}`}
              {...register('name', { required: 'name is required' })}
              disabled
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
            <ErrorMessage>{errors.discription?.message}</ErrorMessage>

          </Contain>
          {/* <Submit type="submit">{isLoading ? <LoaderForButton /> : t("StaffPetrolRequest.submit")}</Submit> */}
          <SubmitButton isLoading={isLoading} title={t("StaffPetrolRequest.submit")} />
        </FormContainer>
        <Toaster />
      </Wrraper>


      {/* <DialogModal open={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleSubmit} /> */}


    </>

  )
}

export default StaffPetrolRequest