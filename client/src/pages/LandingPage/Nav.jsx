import React, { useState } from 'react';
import styled from 'styled-components';
import { Mint2 } from '../../asset';
import { useTranslation } from "react-i18next"
import { Link } from 'react-router-dom';
import { Language, Menu } from '@mui/icons-material';
import useMediaQuery from '../../hooks/useMediaQuery'
//MinT
const Container = styled.nav`
  width: 100%;
  height: 40px;
  position: fixed;
  background-color: #E6953C;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  top:0;
  z-index:2;
`;
const LogoContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;

`;

const Logo = styled.img`
  width: 40px; /* Adjust the size as needed */
  height: auto;
  margin-top: 5px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavItem = {
  color: '#fff',
  textDecoration: 'none',
  marginLeft: '20px',
  fontWeight: 'bold'
}


const Navbar = () => {
  const isNotMobileDevice = useMediaQuery("(min-width: 768px)")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t, i18n } = useTranslation('global')
    const scrollToAboutUs = () => {
        const aboutUsSection = document.getElementById('about');
        aboutUsSection.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToServices = () => {
        const servicesSection = document.getElementById('services');
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    };
  const handleLanguage = (language) => {
    // if (i18n.language === 'en') {
    //   i18n.changeLanguage('ኣማ')
    // } else {
    //   i18n.changeLanguage('en')
    // }
    i18n.changeLanguage(language)
  }
  return (
    <Container>
      <LogoContainer>
        <Logo src={Mint2} />
      </LogoContainer><NavLinks>

        <select name='language' defaultValue={i18n.language} id='language' onChange={(e) => handleLanguage(e.target.value)} >
          <option value="" disabled>language</option>
          <option value="en">English</option>
          <option value="ኣማ">አማርኛ</option>
        </select>
        {isNotMobileDevice && <>
          <Link style={NavItem} to="/">{t("Nav.home")}</Link>
          <Link style={NavItem} to="#about" onClick={scrollToAboutUs}>{t("Nav.aboutUs")}</Link>
          <Link style={NavItem} to="#services" onClick={scrollToServices}>{t("Nav.services")}</Link>
        </>}

        {!isNotMobileDevice && <Menu onClick={() => setIsMenuOpen(!isMenuOpen)} />}

      </NavLinks>
      {!isNotMobileDevice && isMenuOpen && <div style={{ position: 'absolute', top: '40px', right: '20px', backgroundColor: '#80808052', gap: "0.5rem", padding: '10px', borderRadius: '5px', display: 'flex', flexDirection: 'column' }}>
        <Link style={NavItem} to="/">{t("Nav.home")}</Link>
        <Link style={NavItem} to="#about" onClick={scrollToAboutUs}>{t("Nav.aboutUs")}</Link>
        <Link style={NavItem} to="#services" onClick={scrollToServices}>{t("Nav.services")}</Link>
      </div>}

    </Container>
  );
};

export default Navbar;
