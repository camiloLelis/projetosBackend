import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import LogoutButton from './LogoutButton';

function CustomerBar() {
  const { user } = useContext(UserContext);

  return (
    <nav>
      <div style={ { display: 'flex', justifyContent: 'space-between' } }>
        <Link
          data-testid="customer_products__element-navbar-link-products"
          to="/customer/products"
        >
          Produtos

        </Link>

        <Link
          data-testid="customer_products__element-navbar-link-orders"
          to="/customer/orders"
        >
          Meus Pedidos

        </Link>

      </div>

      <div>
        <h3
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {user.name }

        </h3>

        <LogoutButton />
      </div>
    </nav>
  );
}

export default CustomerBar;
