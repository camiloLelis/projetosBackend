import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import AdminBar from './AdminBar';
import CustomerBar from './CustomerBar';
import SellerBar from './SellerBar';

const NavBarOption = {
  customer: <CustomerBar />,
  administrator: <AdminBar />,
  seller: <SellerBar />,
};

export default function NavBar() {
  const { user } = useContext(UserContext);

  if (!user) return null;
  return NavBarOption[user.role];
}
