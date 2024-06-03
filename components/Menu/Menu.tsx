import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const getRightValue = ({ isOpen }: { isOpen: boolean }) => isOpen ? '0' : '-100%';

const SideMenuContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => getRightValue({ isOpen })};
  height: 100%;
  width: 30%;
  background-color: #0F52BA;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 30;
  transition: right 0.3s ease;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ isOpen }) => (isOpen ? '70%' : '0')};
  height: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'none' : 'block')};
  }
`;

const SideMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  padding: 22px 22px 22px 0;
`;

const TitleMenu = styled.span`
  font-weight: 700;
  font-size: 27px;
  padding-left: 50px;

`

const CloseButton = styled.button`
  background-color: black;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  color: #fff;
  cursor: pointer;
`;

const SideMenuContent = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
height: calc(100% - 180px);
`;

const ItemsContainer = styled.div`
display: flex;
flex-direction: column;
gap: 20px;
overflow-y: scroll;

&::-webkit-scrollbar {
  width: 8px; /* Largura do scroll */
}
&::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3); /* Cor do scroll */
  border-radius: 4px; /* Borda arredondada */
}

&::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5); /* Cor do scroll ao passar o mouse */
}
`

const CardItem = styled.div`
  background-color: white;
  color: black;
  display: flex;
  justify-content:space-between;
  align-items: center;
  @media (min-width: 1024px) {
    width: 380px;
    gap: 0;
  }
  gap: 10px;
  width: 90%;
  height: 95px;
  margin: 0 auto;
  padding: 23px;
  border-radius: 8px;
  position: relative;
  margin-top: 10px;
`;

const CardTitle = styled.div`
display: flex;
align-items: center;
`

const QuantityContainer = styled.div`
  border: 1px solid rgba(191, 191, 191, 1);
  border-radius: 4px;
  width: 50px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`

const QuantityButton = styled.button`
border: none;
background-color: transparent;
padding: 0 5px;
border-left: 1px solid rgba(191, 191, 191, 1);
border-right: 1px solid rgba(191, 191, 191, 1);
&:first-child {
  border-left: none;
  margin-top: 5px;
  margin-bottom: 5px;
}
&:last-child {
  border-right: none;
  margin-top: 5px;
  margin-bottom: 5px;
}
cursor: pointer;
`

const ItemImage = styled.img`
  max-width: 60px; 
  height: auto; 
  margin-right: 10px;
`;

const ItemName = styled.span`
font-size: 13px;
font-weight: 400;
line-height: 17px;
text-align: left;
@media (min-width: 768px) {
  display: block;
}
display: none;
`

const ValueLabel = styled.span`
font-size: 14px;
font-weight: 700;
line-height: 17px;
text-align: left;
`

const TotalContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px;
`

const RemoveItem = styled.button`
background-color: black;
font-size: 8px;
width: 18px;
height: 18px;
border-radius: 50%;
border: none;
color: #fff;
cursor: pointer;

position: absolute;
top: -6px;
right: -6px;
`

const TotalLabel = styled.span`
  font-size: 28px;
  font-weight: 700;
`

const SideMenuFooter = styled.button`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: -webkit-fill-available;
  background-color: black;
  height: 97px;
  font-size: 28px;
  color:  white;
  border: none;
  cursor: pointer;
`;

interface CartItem {
  id: number;
  name: string;
  photo: string;
  price: string;
  quantity: number;
}

interface SideMenuProps {
  cartItems: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  removeItemFromCart: (itemId: number) => void;
  updateItemQuantity: (itemId: number, quantity: number) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({
  cartItems,
  isOpen,
  onClose,
  removeItemFromCart,
  updateItemQuantity,
}) => {
  const handleQuantityChange = (itemId: number, action: 'add' | 'subtract') => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      const newQuantity = action === 'add' ? item.quantity + 1 : item.quantity - 1;
      updateItemQuantity(itemId, Math.max(newQuantity, 1));
    }
  };

  const handleRemoveItem = (itemId: number) => {
    removeItemFromCart(itemId);
  };

  const totalValue = cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <SideMenuContainer isOpen={isOpen}>
        <SideMenuHeader>
          <TitleMenu>Carrinho <br />de compras</TitleMenu>
          <CloseButton onClick={onClose}>X</CloseButton>
        </SideMenuHeader>
        <SideMenuContent>
          <ItemsContainer>
            {cartItems.map(item => (
              <CardItem key={item.id}>
                <CardTitle>
                  <ItemImage src={item.photo} alt={item.name} />
                  <ItemName>{item.name}</ItemName>
                </CardTitle>
                <QuantityContainer>
                  <QuantityButton
                    onClick={() => handleQuantityChange(item.id, 'subtract')}>
                    -
                  </QuantityButton>
                  {item.quantity}
                  <QuantityButton
                    onClick={() => handleQuantityChange(item.id, 'add')}>
                    +
                  </QuantityButton>
                </QuantityContainer>
                <ValueLabel>R${parseFloat(item.price).toFixed(0)}</ValueLabel>
                <RemoveItem onClick={() => handleRemoveItem(item.id)}>X</RemoveItem>
              </CardItem>
            ))}
          </ItemsContainer>
          <TotalContent>
            <TotalLabel>Total:</TotalLabel>
            <TotalLabel>R$ {totalValue.toFixed(0)}
            </TotalLabel>
          </TotalContent>
        </SideMenuContent>
        <SideMenuFooter>
          {isOpen ?
            "Finalizar compra" : ""
          }
        </SideMenuFooter>
      </SideMenuContainer>
    </>
  );
};

export default SideMenu;
