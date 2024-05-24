import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
padding-left: 65px;
padding-right: 88px;
background-color: #0F52BA;
height: 101px;
`
const SubTitle = styled.span`
font-size: 20px;
font-weight: 300;
margin-left: 10px;
`

const StyledTitle = styled.span`
  font-size: 40px;
  font-weight: 600;
`

const Cart = styled.div`
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
  padding: 15px;
  cursor: pointer;
  `

const CountItems = styled.span`
  font-size: 18px;
  color: #000;
  font-weight: 700;
`

interface HeaderProps {
  cartItems: any[];
  toggleSideMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItems, toggleSideMenu }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);

  return (
    <HeaderContainer>
      <div>
        <StyledTitle>MKS</StyledTitle>
        <SubTitle>Sistemas</SubTitle>
      </div>
      <Cart onClick={toggleSideMenu}>
        <Image src="/images/cart_icon.svg" alt="Cart icon" width={18} height={18} fetchpriority="high" />
        <CountItems>{cartItems.length}</CountItems>
      </Cart>
    </HeaderContainer>
  );
};

export default Header;
