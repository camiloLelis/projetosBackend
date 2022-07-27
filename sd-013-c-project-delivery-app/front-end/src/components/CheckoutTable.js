import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import CheckoutRow from './CheckoutRow';

function CheckoutTable() {
  const { cart } = useContext(UserContext);
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          <th>Remover</th>
        </tr>
      </thead>
      <tbody>
        {
          cart
            .filter((item) => item.quantity > 0)
            .map((item, index) => (
              <CheckoutRow key={ item.name } item={ item } index={ index } />))
        }
      </tbody>
    </table>
  );
}

export default CheckoutTable;
