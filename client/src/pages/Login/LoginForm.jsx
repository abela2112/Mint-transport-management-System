import { LoginOutlined } from '@mui/icons-material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { ToastBar, Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signIn } from '../../api/userApi';
import ErrorMessage from '../../components/ErrorMessage';
import { LoaderForButton } from '../../components/Loader';
import { loginUserSuccess } from '../../redux/features/user';
import { Contain, Input, Label } from '../Register/RegisterCSS';
import { useTranslation } from "react-i18next";

const Form = styled.form`
   display:flex;
   justify-content: center;
   align-items:center;
   flex-direction: column;
   width: 500px;
   height: 70%;
   background-color:white;
   position: relative;
   padding: 2rem;

  @media screen and (max-width: 425px) {
   width: 100%;
   padding: 1rem;
  }
@media screen and (max-width: 768px) {
    width: 90%;
}
`
export const SubmitButton = styled.button`
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
  width: 100%;
`;

const LoginForm = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { t } = useTranslation('global')
    return (
        <Form onSubmit={handleSubmit(async (formdata) => {
            try {
                setIsLoading(true)
                const { data } = await signIn(formdata)
                setError('')
                console.log('response', data)
                setIsLoading(false)
                dispatch(loginUserSuccess(data))
                navigate('/')
            } catch (error) {
                console.log(error)
                setIsLoading(false)
                toast.error(error.response?.data?.message, { duration: 5000, className: "toast" })
                setError(error.response?.data?.message)
            }
        })}>
            <Contain>
                <Label>{t("login.email")}</Label>
                <Input
                    type="email"
                    placeholder={t("login.email")}
                    {...register('email', { required: "Email is required." })}
                />
                <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </Contain>
            <Contain>
                <Label>
                    {t("login.password")}
                </Label>
                <Input
                    type="password"
                    placeholder={t("login.password")}
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    {...register('password', { required: "Password is required." })}
                />
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </Contain>
            <Link to="/forgot-password" style={{ color: '#e6953b', marginTop: '10px', textAlign: 'right', textDecoration: 'none' }}>{t('login.forgotPassword')}?</Link>
            <SubmitButton disabled={isLoading}><LoginOutlined style={{ marginRight: "1rem" }} /> {isLoading ? <LoaderForButton /> : t('login.login')}</SubmitButton>
            {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}

            <Toaster>
                {(t) => (
                    <ToastBar toast={t}>
                        {({ icon, message }) => (
                            <>
                                {icon}
                                {message}
                                <button type='button' onClick={() => toast.dismiss(t.id)}>X</button>
                            </>
                        )}
                    </ToastBar>
                )}
            </Toaster>
        </Form>
    )
}

export default LoginForm