import React from 'react';
import PropTypes from 'proptypes';
import OrderRow from './OrderRow';

function OrderTable({ products }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
      </thead>
      <tbody>
        {
          products
          && products
            .map((item, index) => (
              <OrderRow key={ item.name } item={ item } index={ index } />))
        }
      </tbody>
    </table>
  );
}

OrderTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default OrderTable;
