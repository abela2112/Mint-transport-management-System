import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react'

const StaffApproveModal = ({ isOpenApproveForStaff, setIsOpenApproveForStaff, handleApprove }) => {
    return (
        <Dialog
            open={isOpenApproveForStaff}
            onClose={() => setIsOpenApproveForStaff(false)}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
        >
            <DialogTitle id="dialog-title">
                Do you want to approve?
            </DialogTitle>
            <DialogContent id="dialog-description">
                {/* <DialogContentText></DialogContentText> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsOpenApproveForStaff(false)} style={{ backgroundColor: "Red", color: "white" }}>No</Button>
                <Button
                    style={{ backgroundColor: "Yellow", color: "white" }}
                    autoFocus
                    onClick={() => {
                        handleApprove()
                        setIsOpenApproveForStaff(false);
                    }}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default StaffApproveModal