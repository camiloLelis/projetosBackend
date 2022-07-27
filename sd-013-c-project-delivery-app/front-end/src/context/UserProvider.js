import React, { useEffect, useState } from 'react';
import PropTypes from 'proptypes';
import UserContext from './UserContext';
import { useLocalStorage } from '../utils';
import { getUsers } from '../api';

function UserProvider({ children }) {
  const [user, setUser] = useLocalStorage('user');
  const [cart, setCart] = useLocalStorage('cart', []);
  const [total, setTotal] = useState(0);
  const [sellers, setSellers] = useState();

  useEffect(() => {
    setTotal(() => {
      let totalPrice = 0;
      cart.forEach((element) => {
        totalPrice += element.price * element.quantity;
      });
      console.log(totalPrice);
      return totalPrice;
    });
  }, [cart]);

  useEffect(() => {
    if (user) {
      const getAllSellers = async () => {
        const { users } = await getUsers(user.token);
        setSellers(users.filter((item) => item.role === 'seller'));
      };
      getAllSellers();
    }
  }, [user]);

  const contextValue = {
    user,
    setUser,
    cart,
    setCart,
    total,
    setTotal,
    sellers,
  };

  return (
    <UserContext.Provider value={ contextValue }>
      { children }
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default UserProvider;
