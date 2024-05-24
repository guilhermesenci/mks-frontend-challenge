import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #EEEEEE;
  width: 100%;
  bottom: 0;
  position: fixed;
`;

const FooterContent = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 34px;
`;

const FooterText = styled.p`
  font-size: 12px;
  color: #000;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>&copy; MKS Sistemas © Todos os direitos reservados.</FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
