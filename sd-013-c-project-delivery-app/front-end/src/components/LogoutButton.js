import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';

function LogoutButton() {
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const logout = () => {
    setUser({});
    localStorage.removeItem('user');
    history.push('/');
  };

  return (
    <button
      data-testid="customer_products__element-navbar-link-logout"
      type="button"
      onClick={ logout }
    >
      Sair
    </button>
  );
}

export default LogoutButton;
