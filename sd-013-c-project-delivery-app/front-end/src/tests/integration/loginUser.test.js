import { getByPlaceholderText, getByTestId } from "@testing-library/react";
import App from "../../App";
import renderWithRouter from "../helpers/renderWithRouter";
import userEvent from '@testing-library/user-event';

describe('Ao renderizar <App />', () => {
  let screen;
  beforeEach(async () => {
    screen = renderWithRouter(<App />);
  });
  
  it('A pagina inicial deve conter os inputs de email e senha', () => {
    const emailInput = screen.getByTestId('common_login__input-email');
    const passwordInput = screen.getByTestId('common_login__input-password');
    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
  it('Os inputs de email e senha contém o texto "Login" e "Senha" respectivamente', () => {
    const emailLabel = screen.getByLabelText('Login');
    const passwordLabel = screen.getByLabelText('Senha');
    expect(emailLabel.type).toBe('text');
    expect(passwordLabel.type).toBe('password');
  });
  it(', um botão de login inicialmente desativado e um botão de registrar ativado', () => {
    const loginButton = screen.getByTestId('common_login__button-login');
    const registerButton = screen.getByTestId('common_login__button-register');
    expect(loginButton).toBeDisabled();
    expect(registerButton).toBeEnabled();
  });

  it('testa se todo componentes são renderizados corretamente', () => {


    const email = screen.getByTestId('common_login__input-email');
    const password = screen.getByTestId('common_login__input-password');
    const loginBtn = screen.getByTestId('common_login__button-login');
    const registerBtn = screen.getByTestId('common_login__button-register');

    expect(email).toBeInTheDocument()
    expect(password).toBeInTheDocument()
    expect(loginBtn).toBeInTheDocument()
    expect(registerBtn).toBeInTheDocument()
  })

  it('se digitar um email inválido uma mensagem aparece na tela', () => {

    const email = screen.getByTestId('common_login__input-email');
    const loginBtn = screen.getByTestId('common_login__button-login');
    const password = screen.getByTestId('common_login__input-password');

    userEvent.type(email, 'email.com');
    userEvent.type(password, '123456')

    expect(loginBtn).toBeDisabled()
  })

  it('testa se ao digitar uma senha com menos de 6 caracteres o botão fica desabilitado', () => {
    // renderWithRouter(<Login />);
    const email = screen.getByTestId('common_login__input-email');
    const message = screen.queryByTestId('common_login__element-invalid-email');
    const loginBtn = screen.getByTestId('common_login__button-login');
    const password = screen.getByTestId('common_login__input-password');

    userEvent.type(email, 'email@valido.com');
    userEvent.type(password, '12345')

    expect(message).toBeInTheDocument()
    expect(loginBtn).toBeDisabled()
  })
  it('testa se ao digitar um email e senha válidos, o botão é habilitado', () => {
    const email = screen.getByTestId('common_login__input-email');
    const message = screen.queryByTestId('common_login__element-invalid-email');
    const loginBtn = screen.queryByTestId('common_login__button-login');
    const password = screen.getByTestId('common_login__input-password');

    userEvent.type(email, 'email@valido.com');
    userEvent.type(password, '1234567')

    expect(message).toBeInTheDocument()
    expect(loginBtn).toBeEnabled()
  })
  //PRECISO RESOLVER ESSE--------------
  // it('testa se ao clicar no botão de registro é redirecionado para a rota', () => {
  //   const { history } = renderWithRouter(<App />);
  //   const registerBtn = screen.getByTestId('common_login__button-register')
  //   expect(registerBtn).toBeInTheDocument()

  //   userEvent.click(registerBtn)

  //   expect(history.location.pathname).toBe('/Register')

  // });


});
