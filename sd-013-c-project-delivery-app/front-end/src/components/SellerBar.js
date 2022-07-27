import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import LogoutButton from './LogoutButton';

function SellerBar() {
  const { user } = useContext(UserContext);

  return (
    <nav>
      <div>
        <Link
          data-testid="customer_products__element-navbar-link-orders"
          to="/seller/orders"
        >
          Pedidos

        </Link>
      </div>

      <div
        data-testid="customer_products__element-navbar-user-full-name"
      >
        <div>
          {user.name }
        </div>

        <LogoutButton />
      </div>
    </nav>
  );
}

export default SellerBar;
