import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Admin from './pages/Admin';
import NavBar from './components/NavBar';
import Checkout from './pages/Checkout';
import CustomerSale from './pages/CustomerSale';
import SellerOrders from './pages/SellerOrders';
import SellerSale from './pages/SellerSale';
import CustomerOrders from './pages/CustomerOrders';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Route
        path={ [
          '/customer/products',
          '/admin/manage',
          '/customer/checkout',
          '/seller/orders',
          '/seller/orders/:id',
          '/customer/orders/:id',
          '/customer/orders',
        ] }
        component={ NavBar }
      />
      <Route path="/seller/orders/:id" component={ SellerSale } />
      <Route path="/customer/orders/:id" component={ CustomerSale } />
      <Route exact path="/seller/orders" component={ SellerOrders } />
      <Route exact path="/customer/orders" component={ CustomerOrders } />
      <Route path="/customer/products" component={ Products } />
      <Route path="/customer/checkout" component={ Checkout } />
      <Route path="/admin/manage" component={ Admin } />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
    </BrowserRouter>
  );
}

export default AppRoutes;
