import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils';
import { login } from '../api';
import UserContext from '../context/UserContext';

const redirectDict = {
  customer: '/customer/products',
  seller: '/seller/orders',
  administrator: '/admin/manage',
};

function Login() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login({ email, password });
    console.log(data);
    if (data.user) {
      setUser(data.user);
    } else {
      setError(data.message);
    }
  };

  useEffect(() => {
    if (user && user.role) {
      history.push(redirectDict[user.role]);
    }
  }, [user, history]);

  useEffect(() => {
    if (validateEmail(email) && validatePassword(password)) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
    setError(false); // essa linha é so pro lint parar de reclamar
  }, [password, email]);

  // function handleSubmit(e) {
  //   e.preventDefault();
  // }

  function handlePassword({ target: { value } }) {
    setPassword(value);
  }
  function handleEmail({ target: { value } }) {
    setEmail(value);
  }
  function handleRegister() {
    history.push('/register');
  }
  return (
    <div>
      loginUser
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">
          Login
          <input
            data-testid="common_login__input-email"
            onChange={ handleEmail }
            type="text"
            id="email"
            placeholder="digite o email"
          />
        </label>

        <label htmlFor="senha">
          Senha
          <input
            data-testid="common_login__input-password"
            onChange={ handlePassword }
            type="password"
            id="senha"
            placeholder="digite a senha"
          />
        </label>

        <button
          disabled={ !isReady }
          data-testid="common_login__button-login"
          type="submit"
        >
          Enviar

        </button>
        <button
          data-testid="common_login__button-register"
          onClick={ handleRegister }
          type="button"
        >
          Registrar

        </button>
      </form>
      <span
        style={ !error ? { visibility: 'hidden' } : { visibility: 'visible' } }
        data-testid="common_login__element-invalid-email"
      >
        {'' || error }
      </span>
    </div>
  );
}

export default Login;
