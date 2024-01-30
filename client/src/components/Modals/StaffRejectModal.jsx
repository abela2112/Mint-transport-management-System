import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react'

const StaffRejectModal = ({ isOpenRejectForStaff, setIsOpenRejectForStaff, handleReject }) => {
    return (
        <Dialog
            open={isOpenRejectForStaff}
            onClose={() => setIsOpenRejectForStaff(false)}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
        >
            <DialogTitle id="dialog-title">
                Are you sure you want to reject this request?
                changes can not be undone
            </DialogTitle>
            <DialogContent id="dialog-description">
                {/* <DialogContentText></DialogContentText> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsOpenRejectForStaff(false)} style={{ backgroundColor: "#f5f5f5", color: "gray" }}>No</Button>
                <Button
                    style={{ backgroundColor: "rgb(255, 165, 0)", color: "white" }}
                    autoFocus
                    onClick={() => {
                        handleReject()
                        setIsOpenRejectForStaff(false);
                    }}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default StaffRejectModal