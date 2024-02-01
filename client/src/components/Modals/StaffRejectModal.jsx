import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react'
import { useTranslation } from "react-i18next"
const StaffRejectModal = ({ isOpenRejectForStaff, setIsOpenRejectForStaff, handleReject }) => {
    const {t}=useTranslation('global')
    return (
        <Dialog
            open={isOpenRejectForStaff}
            onClose={() => setIsOpenRejectForStaff(false)}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
        >
            <DialogTitle id="dialog-title"> 
                {t("StaffRejectModal.wantToApprove")}
            </DialogTitle>
            <DialogContent id="dialog-description">
                {/* <DialogContentText></DialogContentText> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsOpenRejectForStaff(false)}  style={{ backgroundColor: "#f5f5f5", color: "gray" }}>{t("StaffRejectModal.no")}</Button>
                <Button
                    style={{ backgroundColor: "rgb(255, 165, 0)", color: "white" }}
                    autoFocus
                    onClick={() => {
                        handleReject()
                        setIsOpenRejectForStaff(false);
                    }}
                >
                    {t("StaffRejectModal.yes")}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default StaffRejectModal