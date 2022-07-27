import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { validateEmail, validatePassword, validateName } from '../utils';
import { register } from '../api';

export default function Register() {
  const [error, setError] = useState();
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const initialbody = {
    name: '',
    email: '',
    passwordRaw: '',
    role: 'customer',
  };
  const [body, setBody] = useState(initialbody);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    function checkBody() {
      if (validateEmail(body.email)
      && validatePassword(body.passwordRaw)
      && validateName(body.name)) {
        setIsReady(true);
      } else {
        setIsReady(false);
      }
    }
    checkBody();
  }, [body]);

  function handleChange(e) {
    const { name, value } = e.target;

    const newBody = {
      ...body,
      [name]: value,
    };
    setBody(newBody);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await register(body);
    const alerta = data.message;
    if (alerta) {
      setError(alerta);
      return;
    }
    await setUser(data.user);
    history.push('/customer/products');
  }

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={ handleSubmit }>
        <label onChange={ handleChange } htmlFor="register-nome">

          Nome:
          <input
            data-testid="common_register__input-name"
            name="name"
            type="text"
            id="register-nome"
            placeholder="Dona Tereza"
          />
        </label>

        <label onChange={ handleChange } htmlFor="register-email">

          Email:
          <input
            data-testid="common_register__input-email"
            name="email"
            type="text"
            id="register-email"
            placeholder="example@exemple.com"
          />
        </label>

        <label
          onChange={ handleChange }
          htmlFor="register-senha"
        >

          Password:
          <input
            data-testid="common_register__input-password"
            type="password"
            name="passwordRaw"
            id="register-senha"
            placeholder="sua senha"
          />
        </label>

        <button
          data-testid="common_register__button-register"
          disabled={ !isReady }
          type="submit"
        >

          Registar

        </button>
        <span
          style={ !error ? { visibility: 'hidden' } : { visibility: 'visible' } }
          data-testid="common_register__element-invalid_register"
        >
          {'' || error }
        </span>
      </form>
    </div>
  );
}
