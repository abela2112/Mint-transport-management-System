import React from 'react'
import { useTranslation } from "react-i18next"
const Header = () => {
    const {t}=useTranslation('global')
    return (
        <div>{t("header")}</div>
    )
}

export default Header
