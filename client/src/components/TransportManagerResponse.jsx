import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { useTranslation } from "react-i18next";
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getAvailableCar, updateCarStatus, updateRequestById } from '../api/userApi';
import { Mint } from '../asset';
import { Contain, Input, SelectOption } from '../pages/Register/RegisterCSS';

const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:100vw;
    height:100vh;
    background-color: #e0e0e0;
   
`
const ImgmintContainer = styled.div`
   display:flex;
   justify-content:center;
   align-items:center;
  
  width: 100px;
  height: 100px;
  margin-left: 5px;
`;


const Img1 = styled.img`
  width: 100px;
  height:100px;
  object-fit: cover;
`;
const Wrapper = styled.div`
margin-top:50px;
padding:20px;
// border-radius:30px;
display:flex;
align-items:center;
justify-content:center;
width:100%;

height:80vh;
background-color: #fff;
flex-direction: column;
// border: 3px solid orange;
  box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
-webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
-moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
`

const Form = styled.form`
display: flex;
justify-content:center;

flex-wrap: wrap;

width: 100%;
margin:10px 0;
padding:10px;
`
const Desc = styled.h1`
  text-align: center;
`;

const InputForm = styled.input`
// box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
// -webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
// -moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
margin: 5px 0;
padding: 10px;
width:400px;
border: 1px solid #ccc;
border-radius: 10px;
margin-bottom: 10px;
`
const Lable = styled.p`
  margin-top:5px;
`
const LabledInput = styled.div`

   display:flex;
   flex-direction:column;
   padding-right:20px;
  
`
const Select = styled.select`
margin: 5px 0;
padding: 10px;
width:400px;
border: 1px solid #ccc;
border-radius: 10px;
margin-bottom: 10px;
`
const Option = styled.option``
const ButtonConatainer = styled.button`
background-color: #164E62;
color: white;
border: none;
border-radius: 5px;
padding: 10px 20px;
font-size: 16px;
cursor: pointer;
margin-top: 20px;
display:flex;
align-items: center;
justify-content: center;
width: 400px;
`
const TransportManagerResponse = ({ open, setOpen, onSubmit, requestId }) => {
    const [cars, setCars] = useState('')
    const [filterdCar, setFilterdCar] = useState([])
    const [PlateNumber, setPlateNumber] = useState('')
    const [DriverName, setDriverName] = useState('')
    const [DriverPhone, setDriverPhone] = useState('')
    const [CarModel, setCarModel] = useState('')
    const [ReturnDate, setReturnDate] = useState('')
    const { id } = useParams()
    const { t } = useTranslation('global')
    useEffect(() => {
        getAvailableCar().then(({ data }) => {
            setCars(data)
        }).catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        PlateNumber && setFilterdCar(
            ...cars.filter(car => car?.licencePlateNumber === PlateNumber)
        )

        if (filterdCar) {
            setDriverName(filterdCar?.DriverName)
            setDriverPhone(filterdCar?.DriverPhoneNumber)
            setCarModel(filterdCar?.model)
        }
    }, [PlateNumber, filterdCar])
    console.log(PlateNumber)


    const handleClose = () => {
        setOpen(false)
    }
    const handleSubmit = () => {
        updateCarStatus(filterdCar?._id, { status: "taken" }).then(() => console.log("status updated")).catch((err) => console.log(err))
        updateRequestById(requestId, { status: 'approved' }).then(() => console.log('approved successfully')).catch((err) => console.log(err));
        onSubmit({ requestId, PlateNumber, DriverName, DriverPhone, CarModel, ReturnDate })
        handleClose()
    }



    console.log('driver-name', DriverName)
    return (
        <>
            {/* <Button onClick={handleOpen}>Open dialog</Button> */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'
                maxWidth='md'
                fullWidth={true}
                overflow='hidden'
            >
                <DialogTitle id='dialog-title'>{t("TransportManagerResponse.approve")}</DialogTitle>
                <DialogContent id='dialog-description'>
                    <Wrapper>
                        <ImgmintContainer>
                            <Img1 src={Mint} />
                        </ImgmintContainer>
                        <Form>
                            <Contain>
                                <Lable>{t("TransportManagerResponse.plateNumber")}</Lable>
                                <SelectOption


                                    placeholder={t("TransportManagerResponse.plateNumber")}

                                    value={PlateNumber}
                                    onChange={(e) => setPlateNumber(e.target.value)}
                                >
                                    {cars.length > 0 && cars.map((car, i) => (
                                        <Option key={i} value={car?.licencePlateNumber} >{car?.licencePlateNumber} </Option>
                                    ))}
                                </SelectOption>
                            </Contain>
                            <Contain>
                                <Lable>{t("TransportManagerResponse.driverName")}</Lable>

                                <Input
                                    type="text"
                                    placeholder={t("TransportManagerResponse.driverName")}
                                    value={DriverName}
                                    onChange={(e) => setDriverName(e.target.value)} />
                            </Contain>
                            <Contain>
                                <Lable>{t("TransportManagerResponse.driverPhone")}</Lable>

                                <Input
                                    type="tel"
                                    placeholder={t("TransportManagerResponse.driverPhone")}
                                    value={DriverPhone}
                                    onChange={(e) => setDriverPhone(e.target.value)} />
                            </Contain>
                            <Contain>
                                <Lable>{t("TransportManagerResponse.carModel")}</Lable>

                                <Input
                                    type="text"
                                    placeholder={t("TransportManagerResponse.carModel")}
                                    value={CarModel}
                                    onChange={(e) => setCarModel(e.target.value)}
                                />

                            </Contain >
                            <Contain>
                                <Lable>{t("TransportManagerResponse.returnDate")}</Lable>

                                <Input
                                    type="date"
                                    placeholder="MM/dd/yy"
                                    value={ReturnDate}
                                    onChange={(e) => setReturnDate(e.target.value)}
                                />

                            </Contain>

                        </Form >



                    </Wrapper >

                </DialogContent >
                <DialogActions>
                    <Button onClick={handleClose} style={{ backgroundColor: "#f5f5f5", color: "gray" }}>{t("TransportManagerResponse.cancel")}</Button>
                    <Button autoFocus onClick={handleSubmit} style={{ backgroundColor: "#ee8624", color: "white" }}>{t("TransportManagerResponse.submit")}</Button>

                </DialogActions >
            </Dialog >
        </>

    )
}



export default TransportManagerResponse