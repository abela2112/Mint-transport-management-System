import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import toast, { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { Contain, FormContainer, Input, Label, Option, SelectOption } from '../Register/RegisterCSS';
import { editUser, getAllDepartment } from '../../api/userApi';
import CustomToastBar from '../../components/ToastErrorMessage';
import { useTranslation } from 'react-i18next';
const EditUserDialog = ({ id, isOpen, setIsOpen, user }) => {
    const [position, setPosition] = useState('')
    const [password, setPassword] = useState('')
    const [department, setDepartment] = useState('')
    const [role, setRole] = useState('')
    const { t } = useTranslation('global')
    const { isPending, error, data } = useQuery({
        queryKey: ['department'],
        queryFn: getAllDepartment,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
    const handleSubmit = (e) => {
        editUser(id, { position, password, department, role }).then(({ data }) => {
            e.target.reset()
            console.log(data?.user?.user)
        }).catch((error) => toast.error(error.response.data.message))
    }


    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
        >
            <DialogTitle id="dialog-title">
                {t("UserRequestDetail.editInfo")}
            </DialogTitle>
            <DialogContent id="dialog-description">

                <FormContainer>
                    <Contain>
                        <Label>{t("UserRequestDetail.position")}</Label>
                        <SelectOption defaultValue={position} onChange={(e) => setPosition(e.target.value)}>
                            <Option disabled>{position}</Option>
                            <Option>{t("UserRequestDetail.CEO")}</Option>
                            <Option>{t("UserRequestDetail.Desk")}</Option>
                            <Option>{t("UserRequestDetail.Expert")}</Option>
                        </SelectOption>
                    </Contain>
                    <Contain>
                        <Label>{t("UserRequestDetail.role")}</Label>
                        <SelectOption defaultValue={user?.role} onChange={(e) => setRole(e.target.value)}>
                            <Option disabled >{role}</Option>
                            <Option>{t("UserRequestDetail.staff")}</Option>
                            <Option>{t("UserRequestDetail.staffManager")}</Option>
                            <Option>{t("UserRequestDetail.transportManager")}</Option>
                        </SelectOption>
                    </Contain>
                    <Contain>
                        <Label>{t("UserRequestDetail.department")}</Label>
                        {isPending ?
                            <p>Loading...</p> :
                            <SelectOption
                                defaultValue={user?.department}
                                onChange={(e) => setDepartment(e.target.value)}
                            >
                                {/* <Option disabled selected>{department}</Option> */}
                                {data?.data.map((dept, i) => (
                                    <Option key={i + dept?.deptName} value={dept?.deptName} >{dept?.deptName} </Option>
                                ))}
                            </SelectOption>
                        }
                    </Contain>
                    <Contain>
                        <Label>{t("UserRequestDetail.password")}</Label>
                        <Input
                            type="password"
                            placeholder={t("UserRequestDetail.password")}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </Contain>
                    {
                        password && <Contain>
                            <Label> confirm password</Label>
                            <Input
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </Contain>
                    }

                </FormContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsOpen(false)} style={{ backgroundColor: "#f5f5f5", color: "gray" }}>{t("UserRequestDetail.cancel")}</Button>
                <Button
                    type='button'
                    style={{ backgroundColor: "#ee8624", color: "white" }}
                    autoFocus
                    onClick={() => {
                        handleSubmit()
                    }}
                >
                    {t("UserRequestDetail.submit")}
                </Button>
            </DialogActions>

        </Dialog>
    )
}

export default EditUserDialog