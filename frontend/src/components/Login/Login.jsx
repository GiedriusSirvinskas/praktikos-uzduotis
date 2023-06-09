import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './../../context/AuthContext';
import { useContext } from 'react';

function Login() {
  const loginURL = 'http://localhost:3000/users/login';
  const [error, setError] = useState('');

  const { getLoggedIn } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        await axios.post(loginURL, values);
        getLoggedIn();
      } catch {
        (error) => setError(error.response.data.error);
      }
    },
  });

  return (
    <div className='loginPage'>
      <h3>Login</h3>
      <form onSubmit={formik.handleSubmit} className='loginForm'>
        <input
          type='email'
          placeholder='Email'
          name='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <button type='submit' className='gradient-class'>
          Login
        </button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to='/signup' className='signupLink'>
          Register
        </Link>
      </p>
      <div>{error}</div>
    </div>
  );
}

export default Login;
