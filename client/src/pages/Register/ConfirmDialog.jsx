import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation('global')
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">
        {password !== confirmPassword ? t("Register.confirmPassword") : "Registration Successful"}
      </DialogTitle>
      <DialogContent id="dialog-description">
        {password !== confirmPassword ? (
          <DialogContentText>{t("Register.noMatch")}</DialogContentText>
        ) : (
            <DialogContentText>{t("Register.congrats")}</DialogContentText>
        )}
        {password !== confirmPassword && (
          <Contain>
            <Label>{t("Register.confirmPassword")}</Label>
            <Input
              type="password"
              placeholder={t("Register.confirmPassword")}
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
              {t("Register.cancel")}
            </Button>
            <Button
              style={{ backgroundColor: "Yellow", color: "white" }}
              autoFocus
              onClick={() => {
                setIsOpen(false);
              }}
            >
              {t("Register.submit")}
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsOpen(false)} color="primary">
              {t("Register.close")}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog