import React, { useContext, useEffect, useState } from 'react';
import { registerByAdmin } from '../api';
import UserContext from '../context/UserContext';
import { validateEmail, validateName, validatePassword } from '../utils';

function NewUserForm() {
  const initialbody = {
    name: '',
    email: '',
    passwordRaw: '',
    role: 'customer',
  };
  const [error, setError] = useState();
  const [body, setBody] = useState(initialbody);
  const [isReady, setIsReady] = useState(false);
  const { user } = useContext(UserContext);

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
    const data = await registerByAdmin(body, user.token);
    const alerta = data.message;
    if (alerta) {
      setError(alerta);
    }
  }

  return (
    <form onSubmit={ handleSubmit }>
      <h1>Registro</h1>
      <label onChange={ handleChange } htmlFor="register-name">
        Nome
        <input
          data-testid="admin_manage__input-name"
          name="name"
          type="text"
          id="register-name"
          placeholder="Nome e Sobrenome"
        />
      </label>

      <label onChange={ handleChange } htmlFor="register-email">
        Email
        <input
          data-testid="admin_manage__input-email"
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
        Senha
        <input
          data-testid="admin_manage__input-password"
          type="password"
          name="passwordRaw"
          id="register-senha"
          placeholder="sua senha"
        />
      </label>

      <label
        onChange={ handleChange }
        htmlFor="register-role"
      >
        Tipo
        <select id="register-role" data-testid="admin_manage__select-role" name="role">
          <option value="customer">Comprador</option>
          <option value="seller">Vendedor</option>
          <option value="administrator">Administrador</option>
        </select>
      </label>

      <button
        data-testid="admin_manage__button-register"
        type="submit"
        disabled={ !isReady }
      >
        CADASTRAR
      </button>
      <span
        style={ !error ? { visibility: 'hidden' } : { visibility: 'visible' } }
        data-testid="admin_manage__element-invalid-register"
      >
        {'' || error }
      </span>
    </form>
  );
}

export default NewUserForm;
