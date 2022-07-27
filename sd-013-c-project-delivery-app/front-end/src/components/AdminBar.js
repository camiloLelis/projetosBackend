import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import LogoutButton from './LogoutButton';

function AdminBar() {
  const { user } = useContext(UserContext);

  return (
    <nav>
      <div>
        <Link
          data-testid=""
          to="/admin/manage"
        >
          Gerenciar usuários
        </Link>
      </div>

      <div>
        <h1>
          {user.name}
        </h1>

        <LogoutButton />
      </div>
    </nav>
  );
}

export default AdminBar;
