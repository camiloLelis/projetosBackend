import React, { useContext, useEffect, useState } from 'react';
import { getAllSales } from '../api';
import OrderCard from '../components/OrderCard';
import UserContext from '../context/UserContext';

function SellerOrders() {
  const { user } = useContext(UserContext);
  const [sales, setSales] = useState();

  useEffect(() => {
    const getSales = async () => {
      const salesList = await getAllSales(user.token, user.id);
      console.log(salesList);
      setSales(salesList.sales);
    };
    getSales();
  }, [user.token, user.id]);
  return (
    <div>
      { sales && sales
        .map((sale, index) => (
          <OrderCard key={ sale.id } sale={ sale } index={ index } />))}
    </div>
  );
}

export default SellerOrders;
