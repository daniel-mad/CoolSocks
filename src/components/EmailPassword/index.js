import './styles.scss';

import React, { useEffect, useState } from 'react';
import AuthWrapper from '../AuthWrapper';
import FormInput from '../Forms/FormInput';
import Button from '../Forms/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetPassword,
  resetPasswordError,
} from '../../features/User/userSlice';

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError: user.resetPasswordError,
});

function EmailPassword() {
  const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (resetPasswordSuccess) {
      navigate('/login');
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
      setError(resetPasswordError);
    }
  }, [resetPasswordError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ email }));
  };

  return (
    <AuthWrapper headline='email password'>
      <div className='formWrap'>
        {error.length > 0 && (
          <ul>
            {error.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
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
