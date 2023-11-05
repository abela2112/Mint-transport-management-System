import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material'
import {useState}  from 'react'
import TransManagerResponseComponent from '../pages/TransManagerResponse'


const TransportManagerResponse=({ open, setOpen,onSubmit })=>{

   const [isOpen, setIsOpen] = useState(false)
    
        const handleOpen = () => {
            setIsOpen(true)
        }
    
        const handleClose = () => {
            
setOpen(false)
            
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
                    maxWidth='md'
                    fullWidth={true}
                    overflow='hidden'
                >   
                    <DialogTitle id='dialog-title'>Approve Form</DialogTitle>
                    <DialogContent id='dialog-description'>
                       
                        <TransManagerResponseComponent/>
                       
                     </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button autoFocus onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
    
    


export default TransportManagerResponse