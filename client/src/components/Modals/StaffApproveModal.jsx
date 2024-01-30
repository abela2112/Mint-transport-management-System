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
                Are you sure do you want to  approve this request?
            </DialogTitle>
            <DialogContent id="dialog-description">
                {/* <DialogContentText></DialogContentText> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsOpenApproveForStaff(false)} style={{ backgroundColor: "#f5f5f5", color: "gray" }}>No</Button>
                <Button
                    style={{ backgroundColor: "rgb(255, 165, 0)", color: "white" }}
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