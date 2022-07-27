import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { editSaleStatusById, getSaleById } from '../api/index';
import OrderTable from '../components/OrderTable';

export default function CustomerSale() {
  const [sale, setSale] = useState();
  const [products, setProducts] = useState();
  const { user, sellers } = useContext(UserContext);
  const { id } = useParams();

  const handleStatus = async (status) => {
    const { sale: updatedSale } = await editSaleStatusById(user.token, status, id);
    console.log(updatedSale);
    setSale((prev) => ({ ...prev, status }));
  };

  useEffect(() => {
    const getSale = async () => {
      const result = await getSaleById(user.token, id);
      console.log(result);
      setSale(result.sale);
      setProducts(result.products);
    };
    getSale();
  }, [user.token, id]);
  if (!sale || !sellers) return null;
  return (
    <div>
      <p data-testid="customer_order_details__element-order-details-label-order-id">
        {sale.id}
      </p>
      <p data-testid="customer_order_details__element-order-details-label-seller-name">
        { sellers.find((seller) => seller.id === sale.sellerId).name}
      </p>
      <p data-testid="customer_order_details__element-order-details-label-order-date">
        {moment(sale.saleDate).format('L')}
      </p>
      <p
        data-testid="customer_order_details__element-order-details-label-delivery-status"
      >
        {sale.status}
      </p>
      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
        disabled={ sale.status !== 'Em Trânsito' }
        onClick={ () => handleStatus('Entregue') }
      >
        Marcar como entregue
      </button>
      <OrderTable products={ products } />
      <p>
        Total: R$
        <span data-testid="customer_order_details__element-order-total-price">
          {sale.totalPrice.replace('.', ',')}
        </span>
      </p>
    </div>
  );
}
