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
                <DialogTitle id='dialog-title'>{t("UserRequestDetail.confirm")}</DialogTitle>
                <DialogContent id='dialog-description'>
                   
                    <DialogContentText></DialogContentText>
                    {/* Are you sure do you want to send this request? */}
                 </DialogContent>
                <DialogActions>
                   
                    <Button onClick={handleClose} style={{ backgroundColor: "#f5f5f5", color: "gray" }}>{t("DialogModal.cancel")}</Button>
                    <Button
                        style={{ backgroundColor: "#ee8624", color: "white" }}
                        autoFocus
                        onClick={() => {
                            handleSubmit()
                        }}
                    >
                      {t("DialogModal.submit")}
                    </Button>

                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogModal