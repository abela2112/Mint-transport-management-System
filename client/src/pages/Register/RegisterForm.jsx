import React, { useEffect, useState } from 'react'
import { BottomText, Contain, FormContainer, Input, Label, Option, SelectOption, SignUpButton } from './RegisterCSS'
import { Link } from 'react-router-dom'
import { getAllDepartment, signUp } from '../../api/userApi';
import { io } from 'socket.io-client';
import ConfirmDialog from './ConfirmDialog';
import Center from '../../components/Center';
import { PersonAdd } from '@mui/icons-material';
import { LoaderForButton } from '../../components/Loader';
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
                <Label>First Name</Label>
                <Input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    title="Enter your First name"
                />
            </Contain>
            <Contain>
                <Label>Last Name</Label>
                <Input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    title="Enter your last name"
                />
            </Contain>
            <Contain>
                <Label>Email</Label>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    title="Enter your organization email like firstName.lastName@mint.gov.et"
                />
            </Contain>
            <Contain>

                <Label>Department</Label>
                <SelectOption
                    title="select your department"
                    placeholder="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                >
                    {deptArray.map((dept, i) => (
                        <Option key={i} value={dept?.deptName} >{dept?.deptName} </Option>
                    ))}
                </SelectOption>
            </Contain>

            <Contain>

                <Label>Position</Label>
                <SelectOption title="select your position" onChange={(e) => setPosition(e.target.value)}>
                    <Option disabled selected>Select Option</Option>
                    <Option>CEO</Option>
                    <Option>Desk</Option>
                    <Option>Expert</Option>
                </SelectOption>
            </Contain>

            <Contain>

                <Label>Password</Label>
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    title="Your password must containe al-least one number one special character and one letter"
                />
            </Contain>
            <Contain>

                <Label>Phone</Label>
                <Input
                    type="tel"
                    placeholder="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    title="Your phone number must be 10 digit number"
                />
            </Contain>
            <Contain>
                <Label>Confirm Password</Label>
                <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    title="confirm password must be the same as the main password"
                />
            </Contain>

            <BottomText>
                <p>Already have an account? <Link className='link' to={'/login'} style={{ color: '#e6953b' }}>Sign in</Link>  </p>
            </BottomText>
            <Center>
                <SignUpButton disabled={isLoading} onClick={() => (password !== confirmPassword) ? setIsOpen(true) : setIsOpen(false)} >
                    <PersonAdd style={{ marginRight: "1rem" }} />
                    {isLoading ? <LoaderForButton /> : "Register"}</SignUpButton>
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