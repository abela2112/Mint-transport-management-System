import React from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Contain, Input, Label } from './RegisterCSS';
const ConfirmDialog = ({ isOpen, setIsOpen, password, confirmPassword, setConfirmPassword }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">
        {password !== confirmPassword ? "Confirm Password" : "Registration Successful"}
      </DialogTitle>
      <DialogContent id="dialog-description">
        {password !== confirmPassword ? (
          <DialogContentText>Password doesn't match! Please confirm again</DialogContentText>
        ) : (
          <DialogContentText>Congratulations! You have successfully registered check your admin for approval</DialogContentText>
        )}
        {password !== confirmPassword && (
          <Contain>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Contain>
        )}
      </DialogContent>
      <DialogActions>
        {password !== confirmPassword ? (
          <>
            <Button onClick={() => setIsOpen(false)} style={{ backgroundColor: "Red", color: "white" }}>
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: "Yellow", color: "white" }}
              autoFocus
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Submit
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsOpen(false)} color="primary">
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog