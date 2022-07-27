import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../context/UserContext';
import './CssTemporario.css';

export default function CardItem({ item: { urlImage: image, price, id, name } }) {
  const [quantity, setQuantity] = useState(0);
  const [firstRender, setFirstRender] = useState(true);
  const { cart, setCart } = useContext(UserContext);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    } else {
      setCart((prev) => {
        if (prev.find((product) => product.id === id)) {
          return prev.map((product) => {
            if (product.id === id) {
              return {
                id,
                quantity,
                price: Number(price),
                name,
              };
            }
            return product;
          });
        }

        return [...prev, { id, quantity, price: Number(price), name }];
      });
    }
  }, [id, price, quantity]);

  useEffect(() => {
    const NEGATIVA_NUMBER = -1;
    const index = cart.findIndex((product) => product.id === id);
    console.log(index);
    if (index !== NEGATIVA_NUMBER) {
      setQuantity(cart[index].quantity);
    }
  }, [cart, id]);

  function handleClickMore() {
    setQuantity(quantity + 1);
  }

  function handleClickLess() {
    if (quantity <= 0) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
  }

  function handleChange({ target: { value } }) {
    if (value) {
      setQuantity(Number(value));
    } else {
      setQuantity(0);
    }
  }

  return (
    <div className="card">
      <p
        className="card-price"
      >
        R$
        <span data-testid={ `customer_products__element-card-price-${id}` }>
          {price.replace('.', ',')}
        </span>
      </p>
      <img
        className="card-img"
        alt="imagem do produto"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ image }
      />
      <p
        data-testid={ `customer_products__element-card-title-${id}` }
        className="card-name-item"
      >
        {name}

      </p>
      <div
        className="card-price"
      >
        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          onClick={ handleClickMore }
          className="card-btn-+"
        >
          +

        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          type="number"
          value={ quantity }
          className="card-qtn"
          min={ 0 }
          onChange={ handleChange }
        />

        <button
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          onClick={ handleClickLess }
          className="card-btn--"
        >
          -

        </button>
      </div>
    </div>
  );
}

CardItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    urlImage: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};
