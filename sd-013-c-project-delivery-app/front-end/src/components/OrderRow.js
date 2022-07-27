import React, { useContext } from 'react';
import PropTypes from 'proptypes';
import UserContext from '../context/UserContext';
import { roundDigits } from '../utils';

function OrderRow({ item, index }) {
  const { user: { role } } = useContext(UserContext);
  return (
    <tr>
      <td
        data-testid={ `${role}_order_details__element-order-table-item-number-${index}` }
      >
        {index + 1}
      </td>
      <td data-testid={ `${role}_order_details__element-order-table-name-${index}` }>
        {item.name}
      </td>
      <td data-testid={ `${role}_order_details__element-order-table-quantity-${index}` }>
        {item.quantity}
      </td>
      <td>
        R$
        <span
          data-testid={ `${role}_order_details__element-order-table-price-${index}` }
        >
          {roundDigits(item.price).replace('.', ',')}
        </span>
      </td>
      <td>
        R$
        <span
          data-testid={ `${role}_order_details__element-order-table-sub-total-${index}` }
        >
          {roundDigits(item.price * item.quantity).replace('.', ',')}
        </span>
      </td>
    </tr>
  );
}

OrderRow.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default OrderRow;
