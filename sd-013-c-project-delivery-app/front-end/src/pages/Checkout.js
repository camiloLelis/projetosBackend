import React, { useContext } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import CheckoutTable from '../components/CheckoutTable';
import UserContext from '../context/UserContext';
import { roundDigits } from '../utils';

function Checkout() {
  const { total } = useContext(UserContext);

  return (
    <div>
      <CheckoutTable />
      <p>
        Total R$
        <span data-testid="customer_checkout__element-order-total-price">
          { roundDigits(total).replace('.', ',')}
        </span>
      </p>
      <CheckoutForm />
    </div>
  );
}

export default Checkout;
