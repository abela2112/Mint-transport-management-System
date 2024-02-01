import React, { useEffect, useState } from 'react'
import { BottomText, Contain, FormContainer, Input, Label, Option, SelectOption, SignUpButton } from './RegisterCSS'
import { Link } from 'react-router-dom'
import { getAllDepartment, signUp } from '../../api/userApi';
import { io } from 'socket.io-client';
import ConfirmDialog from './ConfirmDialog';
import Center from '../../components/Center';
import { PersonAdd } from '@mui/icons-material';
import { LoaderForButton } from '../../components/Loader';
import { useTranslation } from "react-i18next"

const RegisterForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [position, setPosition] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('');
    const [deptArray, setDeptArray] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const socket = io("http://localhost:5000");
    const { t } = useTranslation('global')
    const handleSignUp = (e) => {
        e.preventDefault()
        setError('');
        // Make the API request to your backend using Axios
        setIsLoading(true)
        signUp({ firstName, lastName, email, position, department, password, phoneNumber })
            .then(({ data }) => {
                setIsOpen(true);
                e.target.reset()
                setIsLoading(false);
                console.log('Successfully registered', data);
                socket.emit('sendNotificationToAdmin', { notificationType: "user-register-request", messageId: data.user?._id, message: 'new user register request', from: data.user?._id });
            }).catch((error) => {
                if (error.response) {
                    console.log(error)
                    setIsLoading(false)
                    setError(error.response.data.message);
                } else {
                    // Handle network errors or other exceptions
                    console.log('Error:', error);
                }
            }
            )

        // Success, perform further actions or submit the form
    }

    useEffect(() => {
        getAllDepartment().then(({ data }) => setDeptArray(data)).catch((error) => console.log(error))

    }, [])
    return (<>
        <FormContainer onSubmit={handleSignUp}>
            <Contain>
                <Label>{t("Register.firstName")}</Label>
                <Input
                    type="text"
                    placeholder={t("Register.firstName")}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    // title="Enter your First name"
                />
            </Contain>
            <Contain>
                <Label>{t("Register.lastName")}</Label>
                <Input
                    type="text"
                    placeholder={t("Register.lastName")}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    title="Enter your last name"
                />
            </Contain>
            <Contain>
                <Label>{t("Register.email")}</Label>
                <Input
                    type="email"
                    placeholder={t("Register.email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    title="Enter your organization email like firstName.lastName@mint.gov.et"
                />
            </Contain>
            <Contain>

                <Label>{t("Register.department")}</Label>
                <SelectOption
                    title="select your department"
                    placeholder={t("Register.department")}
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                >
                    {deptArray.map((dept, i) => (
                        <Option key={i} value={dept?.deptName} >{dept?.deptName} </Option>
                    ))}
                </SelectOption>
            </Contain>

            <Contain>

                <Label>{t("Register.position")}</Label>
                <SelectOption title="select your position" onChange={(e) => setPosition(e.target.value)}>
                    <Option disabled selected>{t("Register.choose")}</Option>
                    <Option>{t("Register.CEO")}</Option>
                    <Option>{t("Register.Desk")}</Option>
                    <Option>{t("Register.Expert")}</Option>
                </SelectOption>
            </Contain>

            <Contain>

                <Label>{t("Register.password")}</Label>
                <Input
                    type="password"
                    placeholder={t("Register.password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    title="Your password must containe al-least one number one special character and one letter"
                />
            </Contain>
            <Contain>

                <Label>{t("Register.phoneNumber")}</Label>
                <Input
                    type="tel"
                    placeholder={t("Register.phoneNumber")}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    title="Your phone number must be 10 digit number"
                />
            </Contain>
            <Contain>
                <Label>{t("Register.confirmPassword")}</Label>
                <Input
                    type="password"
                    placeholder={t("Register.confirmPassword")}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    title="confirm password must be the same as the main password"
                />
            </Contain>

            <BottomText>
                <p>{t("Register.account")}? <Link className='link' to={'/login'} style={{ color: '#e6953b' }}>{t("Register.signIn")}</Link>  </p>
            </BottomText>

            <Center>
                <SignUpButton disabled={isLoading} onClick={() => password !== confirmPassword ? setIsOpen(true) : setIsOpen(false)}>
                    <PersonAdd style={{ marginRight: "1rem" }} />
                    {isLoading ? <LoaderForButton /> : t('Register.signUp')}
                </SignUpButton>
            </Center>
        </FormContainer>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ConfirmDialog
            password={password}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setConfirmPassword={setConfirmPassword}
            confirmPassword={confirmPassword} />
    </>
    )
}

export default RegisterForm