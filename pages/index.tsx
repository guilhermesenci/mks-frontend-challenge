import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import styled from 'styled-components';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Card from '../components/Card/Card';
import SideMenu from '../components/Menu/Menu';

const Layout = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
align-content: center;
height: 80vh;
padding: 0 200px;
gap: 22px;
`

interface ApiResponse {
  id: number;
  name: string;
  photo: string;
  price: string;
  brand: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface CartItem extends ApiResponse {
  quantity: number;
}

const Home: React.FC = () => {
  const [data, setData] = useState<ApiResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response: AxiosResponse<{ products: ApiResponse[] }> = await axios.get('https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products', {
          params: {
            page: 1,
            rows: 8,
            sortBy: 'id',
            orderBy: 'DESC'
          },
          headers: {
            'accept': 'application/json'
          }
        });

        const data: ApiResponse[] = response.data.products;
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      fetchData();
    }, 3000)
  }, []);

  const addToCart = (item: ApiResponse): void => {
    const itemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (itemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex] = { ...updatedCartItems[itemIndex], quantity: updatedCartItems[itemIndex].quantity + 1 };
      setCartItems(updatedCartItems);
    } else {
      setCartItems(prevItems => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (itemId: number): void => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateItemQuantity = (itemId: number, quantity: number): void => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: Math.max(quantity, 1) }; // Garantir que a quantidade mínima seja 1
        }
        return item;
      });
    });
  };

  return (
    <div>
      <Header cartItems={cartItems} toggleSideMenu={toggleSideMenu} />
      <Layout>
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => <Card key={index} isLoading={true} />)
        ) : (
          data.map(product => (
            <Card key={product.id} isLoading={false} product={product} addToCart={addToCart} />
          ))
        )}
      </Layout>
      <Footer />
      <SideMenu
        cartItems={cartItems}
        isOpen={isSideMenuOpen}
        onClose={closeSideMenu}
        removeItemFromCart={removeItemFromCart}
        updateItemQuantity={updateItemQuantity}
      />
    </div>
  );
};

export default Home;
