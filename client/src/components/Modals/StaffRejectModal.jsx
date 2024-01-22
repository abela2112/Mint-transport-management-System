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
                <Button onClick={() => setIsOpenRejectForStaff(false)} style={{ backgroundColor: "Red", color: "white" }}>{t("StaffRejectModal.no")}</Button>
                <Button
                    style={{ backgroundColor: "Yellow", color: "black" }}
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