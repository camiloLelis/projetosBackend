import React, { useContext } from 'react';
import PropTypes from 'proptypes';
import { roundDigits } from '../utils';
import UserContext from '../context/UserContext';

function CheckoutRow({ item, index }) {
  const { setCart } = useContext(UserContext);

  const handleClick = () => {
    setCart((prev) => prev.filter((prod) => prod.id !== item.id));
  };

  return (
    <tr>
      <td
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        {index + 1}
      </td>
      <td data-testid={ `customer_checkout__element-order-table-name-${index}` }>
        {item.name}
      </td>
      <td data-testid={ `customer_checkout__element-order-table-quantity-${index}` }>
        {item.quantity}
      </td>
      <td>
        R$
        <span
          data-testid={ `customer_checkout__element-order-table-unit-price-${
            index
          }` }
        >
          {roundDigits(item.price).replace('.', ',')}
        </span>
      </td>
      <td>
        R$
        <span
          data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
        >
          {roundDigits(item.price * item.quantity).replace('.', ',')}
        </span>
      </td>
      <td>
        <button
          data-testid={ `customer_checkout__element-order-table-remove-${index}` }
          type="button"
          onClick={ handleClick }
        >
          Remover
        </button>
      </td>
    </tr>
  );
}

CheckoutRow.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CheckoutRow;
