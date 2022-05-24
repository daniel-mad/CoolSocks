import './styles.scss';

import React, { useState } from 'react';
import AuthWrapper from '../AuthWrapper';
import FormInput from '../Forms/FormInput';
import Button from '../Forms/Button';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function EmailPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const config = {
        url: 'http://localhost:3000/login',
      };
      sendPasswordResetEmail(auth, email, config);

      //   setError(null)
      navigate('/login');
    } catch (err) {
      setError('Email not found.');
    }
  };

  return (
    <AuthWrapper headline='email password'>
      <div className='formWrap'>
        {error && (
          <ul>
            <li>{error}</li>
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormInput
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type='submit'>Email Password</Button>
        </form>
      </div>
    </AuthWrapper>
  );
}

export default EmailPassword;
