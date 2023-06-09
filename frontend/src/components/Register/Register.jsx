import { useFormik } from 'formik';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import RegisterStyles from './Register.module.css';
import { AuthContext } from './../../context/AuthContext';
import { useContext } from 'react';

function Register() {
  const registerURL = 'http://localhost:3000/users/signup';
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { getLoggedIn } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        await axios.post(registerURL, values);
        getLoggedIn();
      } catch (error) {
        setError(error.response.data.error);
      }
    },
  });

  return (
    <div>
      <h3>Registracija</h3>
      <form onSubmit={formik.handleSubmit} className='loginForm'>
        <input
          type='text'
          placeholder='Vardas'
          name='name'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        <input
          type='email'
          placeholder='El. paštas'
          name='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <span className={RegisterStyles.passwordInput}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Slaptažodis'
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <span
            onClick={togglePasswordVisibility}
            className={RegisterStyles.passwordEye}
          >
            {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
          </span>
        </span>
        <button type='submit'>Užsiregistruoti</button>
        <Link to='/'>Atgal</Link>
      </form>
      <div>{error}</div>
    </div>
  );
}

export default Register;
