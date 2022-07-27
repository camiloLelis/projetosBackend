import React from 'react';
import { getByPlaceholderText, getByTestId, waitFor, screen } from "@testing-library/react";
import App from "../../App";
import Register from "../../pages/Register"
import renderWithRouter from "../helpers/renderWithRouter";
import userEvent from '@testing-library/user-event';
import axios from 'axios';
// import { user_mock } from './mocks/users';

jest.mock('axios')
describe('testa a tela de Registro', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('testa se todos os componentes são renderizados corretamente', () => {
    renderWithRouter(<Register />);

    const name = screen.getByTestId('common_register__input-name');
    const email = screen.getByTestId('common_register__input-email');
    const password = screen.getByTestId('common_register__input-password');
    const registerBtn = screen.getByTestId('common_register__button-register');

    expect(name).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(password).toBeInTheDocument()
    expect(registerBtn).toBeInTheDocument()
  });


  it('Botão desabilidado se digitar uma senha menor 6 caracters', () => {
    renderWithRouter(<Register />);

    const email = screen.getByTestId('common_register__input-email');
    const name = screen.getByTestId('common_register__input-name');
    const registerBtn = screen.getByTestId('common_register__button-register');
    const password = screen.getByTestId('common_register__input-password');

    userEvent.type(name, 'Dona Terezaa')
    userEvent.type(email, 'tereza@gmail.com');
    userEvent.type(password, '12345')

    expect(registerBtn).toBeDisabled()
  });

  it('Nome com menos de 12 caracteres', () => {
    renderWithRouter(<Register />);

    const email = screen.getByTestId('common_register__input-email');
    const name = screen.getByTestId('common_register__input-name');
    const registerBtn = screen.getByTestId('common_register__button-register');
    const password = screen.getByTestId('common_register__input-password');

    userEvent.type(name, 'tereza')
    userEvent.type(email, 'tereza@gmail.com');
    userEvent.type(password, '123456')

    expect(registerBtn).toBeDisabled()
  });
  it('Habilita o botão de Registro se todos os campos estiverem corretos', () => {
    renderWithRouter(<Register />);

    const email = screen.getByTestId('common_register__input-email');
    const name = screen.getByTestId('common_register__input-name');
    const registerBtn = screen.getByTestId('common_register__button-register');
    const password = screen.getByTestId('common_register__input-password');

    userEvent.type(name, 'Dona Terezaa')
    userEvent.type(email, 'tereza@gmail.com');
    userEvent.type(password, '123456')

    expect(registerBtn).toBeEnabled()
  });

  it('tenta criar um usuario com o email ja existente no banco de dados',async () => {
    axios.post.mockRejectedValueOnce({ response: { data: { message: 'Email Already Registered'}}})
    renderWithRouter('/Register');
    
    const name = screen.getByTestId('common_register__input-name');
    const email = screen.getByTestId('common_register__input-email');
    const registerBtn = screen.getByTestId('common_register__button-register');
    const password = screen.getByTestId('common_register__input-password');

    userEvent.type(name, 'Dona Terezaa')
    userEvent.type(email, 'tereza@email.com');
    userEvent.type(password, '123456')
    userEvent.click(registerBtn)
    expect(message).toBeInTheDocument()
    expect(message).toHaveTextContent('Email Invalido')
    expect(registerBtn).toBeDisabled()
  });

// it('testa se ao clicar no botão de registro é redirecionado para a rota de Produtos',async () => {
    // axios.post.mockResolvedValueOnce({ data: userMock})
//   renderWithRouter(<Register />);

//   const { history } = renderWithRouter(<Register />);
//   const email = screen.getByTestId('common_register__input-email');
//   const name = screen.getByTestId('common_register__input-name');
//   const password = screen.getByTestId('common_register__input-password');
//   const nameClient = screen.getByTestId('customer_products__element-navbar-user-full-name')
//   const registerBtn = screen.getByTestId('common_register__button-register');

//   userEvent.type(name, 'Dona Terezaa')
//   userEvent.type(email, 'tereza@gmail.com');
//   userEvent.type(password, '1234567')

//   userEvent.click(registerBtn)

// await waitFor(() => expect(history.location.pathname).toBe('/products'), {timeout: 3000})

//   expect(history.location.pathname).toBe('/products')



//   });

});
