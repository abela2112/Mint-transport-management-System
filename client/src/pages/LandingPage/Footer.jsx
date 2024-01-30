import React from 'react';
import styled from 'styled-components';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import { Mint2 } from '../../asset';

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 1px 0; /* Decrease the padding */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  bottom: 0;
//  margin: 0 auto;
`;

const LogoContainer = styled.div`
  margin-left: 20px;
`;

const Logo = styled.img`
  width: 40px;
  height: auto;
  margin-top: 5px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  flex-grow: 1;
`;

const FooterSection = styled.div`
  display: flex;
  justify-content: center; /* Center content horizontally */
  gap: 15px;

  h4 {
    font-size: 12px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin: 5px 0;
  }

  a {
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ContactLink = styled.a`
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const IconContainer = styled.span`
  font-size: 24px;
  margin-right: 5px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <LogoContainer>
        <Logo src={Mint2} />
      </LogoContainer>
      <ContentWrapper>
        <FooterSection>
          <h4>Contact Us</h4>
          <ContactLink href="https://twitter.com/MinistryofInno2/status/1470748755221692420" target="_blank" rel="noopener noreferrer">
            <IconContainer>
              <TwitterIcon />
            </IconContainer>
          </ContactLink>
          <ContactLink href="mailto:info@mint.gov.et" target="_blank" rel="noopener noreferrer">
            <IconContainer>
              <EmailIcon />
            </IconContainer>
          </ContactLink>
          <ContactLink href="https://www.facebook.com/MInT.Ethiopia?__tn__=%3C%2Cd-UC*F" target="_blank" rel="noopener noreferrer">
            <IconContainer>
              <FacebookIcon />
            </IconContainer>
          </ContactLink>
        </FooterSection>
      </ContentWrapper>
    </FooterContainer>
  );
};

export default Footer;
