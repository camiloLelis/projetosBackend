import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { getAllProducts } from '../api/index';
import CardItem from '../components/CardItem';
import { roundDigits } from '../utils';

export default function Products() {
  const [products, setProducts] = useState();
  const history = useHistory();

  const { user, total } = useContext(UserContext);

  const { token } = user;
  const MAX_NUMBER_OF_CARDS = 11;

  const handleClick = () => {
    history.push('/customer/checkout');
  };

  useEffect(() => {
    const getProducts = async () => {
      const productsData = await getAllProducts(token);
      const arrayProducts = productsData.products;
      setProducts(arrayProducts);

      if (arrayProducts.length > MAX_NUMBER_OF_CARDS) {
        const newArrayProducts = arrayProducts.slice(0, MAX_NUMBER_OF_CARDS);
        setProducts(newArrayProducts);
      }
    };
    getProducts();
  }, [token]);

  return (
    <div className="container-products">
      {products && products.map((element, index) => (
        <CardItem
          key={ index }
          item={ element }
        />
      )) }
      <button
        data-testid="customer_products__button-cart"
        type="button"
        className="cost"
        onClick={ handleClick }
        disabled={ total === 0 }
      >
        Ver Carrinho: R$
        <span data-testid="customer_products__checkout-bottom-value">
          {roundDigits(total).replace('.', ',')}
        </span>
      </button>
    </div>
  );
}
