import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { addDriver } from '../../api/userApi'
import { SubmitButton } from '../../components/Buttons'
import { Contain, Input, Label, Title } from '../Register/RegisterCSS'
const Container = styled.div`
width: 100%;


`

const Wrapper = styled.div`
width: 80%;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: space-between;
background-color: white;
padding: 20px;

@media screen and (max-width: 768px) {
   width:100%; 
   padding: 10px;
   align-items: center;
}
`

const FormBox = styled.form`
   padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
`



const ButtonBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`
const AddNewDriver = () => {

    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [registeredDate, setRegisteredDate] = useState("")
    const [error, setError] = useState('')
    const { t } = useTranslation('global')

    const handleClick = (e) => {

        e.preventDefault();
        addDriver({ name, phoneNumber, registeredDate }).then(() => { setPhoneNumber(''); setName(''); setRegisteredDate(''); setError('') }).catch((error) => {
            if (error.response) {
                console.log(error)
                setError(error.response.data.message);
            } else {
                // Handle network errors or other exceptions
                console.log('Error:', error);
            }
        })
    }


    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleButtonClick = () => {
        setIsModalOpen(true);
    };



    return (
        <>
            <Container>
                <Wrapper>
                    <Title>{t('AddnewDriver.title')}</Title>
                    <FormBox>
                        <Contain>
                            <Label>{t('AddnewDriver.name')}</Label>
                            <Input
                                type='text'
                                placeholder={t('AddnewDriver.name')}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Contain>
                        <Contain>
                            <Label>{t('AddnewDriver.phoneNumber')}</Label>
                            <Input
                                type='tel'
                                placeholder={t('AddnewDriver.phoneNumber')}
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </Contain>


                        <Contain>
                            <Label>{t('AddnewDriver.registeredDate')}</Label>
                            <Input
                                type='date'
                                value={registeredDate}
                                onChange={(e) => setRegisteredDate(e.target.value)}
                            />
                        </Contain>

                    </FormBox>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <ButtonBox>

                        <SubmitButton handleForm={handleButtonClick} title={t('AddnewDriver.submit')} />
                        <ConfirmDialog isOpen={isModalOpen} setIsOpen={setIsModalOpen} onSubmit={handleClick} />

                    </ButtonBox>
                </Wrapper>
            </Container></>
    )
}

const ConfirmDialog = ({ isOpen, setIsOpen, onSubmit }) => {
    return <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
    >
        <DialogTitle id="dialog-title">
            Confirmation message
        </DialogTitle>
        <DialogContent id="dialog-description">
            <DialogContentText>Are you sure you want to add this driver ?</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setIsOpen(false)} style={{ backgroundColor: "#f5f5f5", color: "gray" }}>Cancel</Button>
            <Button
                style={{ backgroundColor: "#ee8624", color: "white" }}
                autoFocus
                onClick={() => {
                    onSubmit();
                    setIsOpen(false);
                }}
            >
                Submit
            </Button>
        </DialogActions>
    </Dialog>
}

export default AddNewDriver