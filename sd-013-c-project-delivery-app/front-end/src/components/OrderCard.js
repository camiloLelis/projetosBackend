import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'proptypes';
import { io } from 'socket.io-client';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

function OrderCard({ sale }) {

  const { user } = useContext(UserContext);
  return (
    <Link to={ `/${user.role}/orders/${sale.id}` }>
      <div style={ { border: '1px solid black' } }>
        <h3 data-testid={ `${user.role}_orders__element-order-id-${sale.id}` }>
          {sale.id}
        </h3>
        <p data-testid={ `${user.role}_orders__element-delivery-status-${sale.id}` }>
          {sale.status}
        </p>
        <p data-testid={ `${user.role}_orders__element-card-price-${sale.id}` }>
          {sale.totalPrice.replace('.', ',')}
        </p>
        {
          user.role === 'seller'
          && (
            <p data-testid={ `${user.role}_orders__element-card-address-${sale.id}` }>
              {`${sale.deliveryAddress}, ${sale.deliveryNumber}`}
            </p>
          )
        }
        <p data-testid={ `${user.role}_orders__element-order-date-${sale.id}` }>
          {moment(sale.saleDate).format('L')}
        </p>
      </div>
    </Link>
  );
}

OrderCard.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    totalPrice: PropTypes.string,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
    saleDate: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default OrderCard;
