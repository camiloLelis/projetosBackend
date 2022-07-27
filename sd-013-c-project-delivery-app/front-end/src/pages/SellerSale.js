import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { editSaleStatusById, getSaleById } from '../api';
import OrderTable from '../components/OrderTable';
import UserContext from '../context/UserContext';

function SellerSale() {
  const [sale, setSale] = useState();
  const [products, setProducts] = useState();
  const { user } = useContext(UserContext);
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
  if (!sale) return null;
  return (
    <div>
      <p
        data-testid="seller_order_details__element-order-details-label-order-id"
      >
        {sale.id}
      </p>
      <p
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        {moment(sale.saleDate).format('L')}
      </p>
      <p data-testid="seller_order_details__element-order-details-label-delivery-status">
        {sale.status}
      </p>
      <button
        data-testid="seller_order_details__button-preparing-check"
        type="button"
        disabled={ sale.status !== 'Pendente' }
        onClick={ () => handleStatus('Preparando') }
      >
        Preparar pedido
      </button>
      <button
        data-testid="seller_order_details__button-dispatch-check"
        type="button"
        disabled={ sale.status !== 'Preparando' }
        onClick={ () => handleStatus('Em Trânsito') }
      >
        Saiu para entrega
      </button>
      <OrderTable products={ products } />
      <p>
        Total: R$
        <span data-testid="seller_order_details__element-order-total-price">
          {sale.totalPrice.replace('.', ',')}
        </span>
      </p>
    </div>
  );
}

export default SellerSale;
