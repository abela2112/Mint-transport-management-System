import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material'
import {useState}  from 'react'
import { CancelButton, SubmitButton } from './Buttons'

const DialogModal = ({ open, onClose, onSubmit, message }) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => {
        setIsOpen(false)
        onClose()
    }
    const handleSubmit = (e) => {
        
        onSubmit()
        handleClose()
    }

    return (
        <>
            {/* <Button onClick={handleOpen}>Open dialog</Button> */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'
            >   
                <DialogTitle id='dialog-title'>Confirmation Message</DialogTitle>
                <DialogContent id='dialog-description'>
                   
                    <DialogContentText>{message}</DialogContentText>
                    {/* Are you sure do you want to send this request? */}
                 </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{ backgroundColor: "#f5f5f5", color: "gray" }}>Cancel</Button>
                    <Button
                        style={{ backgroundColor: "#ee8624", color: "white" }}
                        autoFocus
                        onClick={() => {
                            handleSubmit()
                        }}
                    >
                        Yes
                    </Button>

                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogModal