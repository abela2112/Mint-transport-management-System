import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material'
import {useState}  from 'react'

const DialogModal = ({ open, onClose, onSubmit }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(true)
    }

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
                <DialogTitle id='dialog-title'>Add the New driver to the database?</DialogTitle>
                <DialogContent id='dialog-description'>
                   
                    <DialogContentText>Are you sure?</DialogContentText>
                   
                 </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button autoFocus onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogModal