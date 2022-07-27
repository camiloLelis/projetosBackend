import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { io } from 'socket.io-client';
import { getAllSales } from '../api';
import OrderCard from '../components/OrderCard';
import UserContext from '../context/UserContext';

function CustomerOrders() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [sales, setSales] = useState();
  const socket = io('http://localhost:3001');

  useEffect(() => {
    const getSales = async () => {
      const salesList = await getAllSales(user.token, user.id);
      console.log(salesList);
      setSales(salesList.sales);
    };
    getSales();
  }, [user.token, user.id, sales]);

  
  return (
    <div>
      { sales && sales
        .map((sale, index) => (
          <OrderCard key={ sale.id } sale={ sale } index={ index } />))}
    </div>
  );
}

export default CustomerOrders;
