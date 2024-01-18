import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react'
import { useTranslation } from "react-i18next"
const StaffApproveModal = ({ isOpenApproveForStaff, setIsOpenApproveForStaff, handleApprove }) => {
    const {t}=useTranslation('global')
    return (
        <Dialog
            open={isOpenApproveForStaff}
            onClose={() => setIsOpenApproveForStaff(false)}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
        >
            <DialogTitle id="dialog-title">
                {t("StaffApproveModal.wantToApprove")}
            </DialogTitle>
            <DialogContent id="dialog-description">
                {/* <DialogContentText></DialogContentText> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsOpenApproveForStaff(false)} style={{ backgroundColor: "Red", color: "white" }}>{t("StaffApproveModal.no")}</Button>
                <Button
                    style={{ backgroundColor: "Yellow", color: "white" }}
                    autoFocus
                    onClick={() => {
                        handleApprove()
                        setIsOpenApproveForStaff(false);
                    }}
                >
                   {t("StaffApproveModal.yes")}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default StaffApproveModal