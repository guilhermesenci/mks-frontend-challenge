import Image from 'next/image';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const SkeletonAnimation = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;

const CardSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  border-radius: 8px;
  overflow: hidden;
  width: 218px;
  height: 217px;
  animation: ${SkeletonAnimation} 1.5s infinite ease-in-out;
`;

const ImageSkeleton = styled.div`
  height: 100%;
  background-color: #e0e0e0;
`;

const ButtonSkeleton = styled.div`
  background-color: #0F52BA;
  width: 100%;
  height: 32px;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  overflow: hidden;
  max-width: 218px;
  max-height: 285px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1352);
`;

const CardContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
height: -webkit-fill-available;
flex-direction: column;
padding: 15px;
`

const ImgContainer = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ItemImage = styled.img`
  max-width: 100px; 
  height: auto; 
`;

const TitlePrice = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  gap: 5px;
`;

const ItemTitle = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #2C2C2C;
`;

const ItemPrice = styled.span`
  min-width: 64px;
  height: 26px;
  background-color: #373737;
  border-radius: 5px;
  text-align: center;
  padding: 5px;
  w
`;

const ItemDesctiption = styled.span`
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  color: #2C2C2C;
  max-height: 25px;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Número máximo de linhas permitidas */
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 9px;
  `

const ButtonDiv = styled.div`
background-color: rgba(15, 82, 186, 1);
height: 32px;
width: 100%;
position: relative;
bottom: 0;
display: flex;
justify-content: center;
align-items: center;
gap: 5px;
cursor: pointer;
`

const ButtonText = styled.span`
font-weight: 600;
font-size; 14px;
`

interface ApiResponse {
  id: number;
  name: string;
  brand: string;
  createdAt: string;
  description: string;
  photo: string;
  price: string;
  updatedAt: string;
}

interface BaseCardProps {
  isLoading: boolean;
  product?: ApiResponse;
}

interface LoadingCardPropsOptional {
  isLoading: true;
  product?: never;
  addToCart?: (product: ApiResponse) => void;
}

interface ProductCardProps {
  isLoading: false;
  product: ApiResponse;
  addToCart: (product: ApiResponse) => void;
}

type LoadingCardProps = BaseCardProps & LoadingCardPropsOptional;
type CardProps = LoadingCardProps | ProductCardProps;

const Card: React.FC<CardProps> = ({ isLoading, product, addToCart }) => {
  const handleAddToCart = (): void => {
    if (product && addToCart) {
      addToCart(product);
    }
  };

  if (isLoading) {
    return (
      <CardSkeleton>
        <ImageSkeleton />
        <ButtonSkeleton />
      </CardSkeleton>
    );
  }

  return (
    <CardBody>
      <CardContainer>
        <ImgContainer>
          <ItemImage src={product.photo} alt={product.name} />
        </ImgContainer>
        <div>
          <TitlePrice>
            <ItemTitle>{product.name}</ItemTitle>
            <ItemPrice>
              R${parseFloat(product.price).toFixed(0)}</ItemPrice>
          </TitlePrice>
          <ItemDesctiption>{product.description}</ItemDesctiption>
        </div>
      </CardContainer>
      <ButtonDiv onClick={handleAddToCart}>
        <Image src="/images/shopping_icon.svg" alt="Shopping icon" width={18} height={18} />
        <ButtonText>COMPRAR</ButtonText>
      </ButtonDiv>
    </CardBody>
  );
};

export default Card;
