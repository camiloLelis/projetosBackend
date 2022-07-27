import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createSale } from '../api';
import UserContext from '../context/UserContext';

function CheckoutForm() {
  const { user, cart, total, sellers } = useContext(UserContext);
  const [saleInfo, setSaleInfo] = useState({
    deliveryAddress: '',
    deliveryNumber: '',
    sellerId: '',
  });
  const history = useHistory();
  const handleChange = ({ target: { value, name } }) => {
    setSaleInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async () => {
    const products = cart
      .filter((item) => item.quantity > 0)
      .map((item) => ({ id: item.id, quantity: item.quantity }));
    const saleInput = {
      ...saleInfo,
      userId: user.id,
      saleDate: Date.now(),
      status: 'Pendente',
      totalPrice: total,
    };
    console.log(products, saleInput);
    const { sale } = await createSale({ products, saleInput }, user.token);
    console.log(sale.id);
    history.push(`/customer/orders/${sale.id}`);
  };

  useEffect(() => {
    if (sellers) {
      setSaleInfo((prev) => (
        { ...prev, sellerId: sellers[0].id }));
    }
  }, [sellers]);

  return (
    <form>
      <label htmlFor="select-seller">
        <select
          data-testid="customer_checkout__select-seller"
          id="select-seller"
          name="sellerId"
          onChange={ handleChange }
        >
          { sellers && sellers
            .map((seller) => (
              <option value={ seller.id } key={ seller.name }>{seller.name}</option>))}
        </select>
      </label>
      <label htmlFor="input-address">
        <input
          id="input-address"
          data-testid="customer_checkout__input-address"
          name="deliveryAddress"
          type="text"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="addressNumber">
        <input
          id="input-address"
          data-testid="customer_checkout__input-addressNumber"
          name="deliveryNumber"
          type="number"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
        onClick={ handleClick }
      >
        Finalizar pedido
      </button>
    </form>
  );
}

export default CheckoutForm;
