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
                Do you want to approve?
            </DialogTitle>
            <DialogContent id="dialog-description">
                {/* <DialogContentText></DialogContentText> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsOpenRejectForStaff(false)} style={{ backgroundColor: "Red", color: "white" }}>No</Button>
                <Button
                    style={{ backgroundColor: "Yellow", color: "black" }}
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