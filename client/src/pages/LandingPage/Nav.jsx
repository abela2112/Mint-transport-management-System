import React from 'react';
import styled from 'styled-components';
import { Mint2 } from '../../asset';
//MinT
const Container = styled.div`
  width: 100%;
  height: 40px;
  position: absolute;
  background-color: #E6953C;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  top:0;
  z-index:2;
`;
const LogoContainer = styled.div`
  margin-right: 20px;
`;

const Logo = styled.img`
  width: 40px; /* Adjust the size as needed */
  height: auto;
  margin-top:px;
`;

const NavLinks = styled.div`
  display: flex;
`;

const NavItem = styled.a`
  color: #fff;
  text-decoration: none;
  margin-left: 20px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  return (
    <Container>
      <LogoContainer>
        <Logo src={Mint2} />
      </LogoContainer>
      <NavLinks>
        <NavItem href="/">Home</NavItem>
        <NavItem href="#about" >About Us</NavItem>
        <NavItem href="#services">Services</NavItem>
      </NavLinks>
    </Container>
  );
};

export default Navbar;
