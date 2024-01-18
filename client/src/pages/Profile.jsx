import React from 'react'
import { useTranslation } from "react-i18next"
const Profile = () => {
  const {t}=useTranslation('global')
  return (
    <div>{t("Profile.profile")}</div>
  )
}

export default Profile