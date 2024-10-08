import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Login.css';

// Definindo o schema de validação
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  senha: Yup.string()
    .required('Senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

function LoginPage() {
  const navigate = useNavigate();

  // Função para redirecionar para a página de registro
  const handleRegister = () => {
    console.log("Botão clicado");
    navigate('/register'); // Redireciona para a página de registro
  };

  // Função para lidar com o login
  const handleLogin = async (values) => {
    try {
      const response = await axios.post('http://localhost:3000/login', values);
      console.log(response);
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/properties');
    } catch (error) {
      console.error('Login falhou:', error);
      toast.error('Email ou senha inválidos.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <Formik
          initialValues={{ email: '', senha: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="senha">Senha:</label>
              <Field
                type="password"
                id="senha"
                name="senha"
                placeholder="Digite sua senha"
              />
              <ErrorMessage name="senha" component="div" className="error" />
            </div>
            <button className='button-login' type="submit">Login</button>
          </Form>
        </Formik>
        <button type="button" className='button-register' onClick={handleRegister}>Register</button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default LoginPage;
