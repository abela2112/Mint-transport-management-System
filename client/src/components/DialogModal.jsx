import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material'
import {useState}  from 'react'
import { useTranslation } from "react-i18next"
const DialogModal = ({ open, onClose, onSubmit }) => {
    const [isOpen, setIsOpen] = useState(false)
    const {t}=useTranslation('global')
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
                <DialogTitle id='dialog-title'>{t("DialogModal.addData")}</DialogTitle>
                <DialogContent id='dialog-description'>
                   
                    <DialogContentText>{t("DialogModal.areYouSure")}</DialogContentText>
                   
                 </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t("DialogModal.cancel")}</Button>
                    <Button autoFocus onClick={handleSubmit}>{t("DialogModal.submit")}</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogModal