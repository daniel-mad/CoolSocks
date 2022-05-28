import './styles.scss';

import React, { useEffect, useState } from 'react';
import AuthWrapper from '../AuthWrapper';
import FormInput from '../Forms/FormInput';
import Button from '../Forms/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetPasswordStart,
  resetUserState,
} from '../../features/User/userSlice';

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr,
});

function EmailPassword() {
  const { resetPasswordSuccess, userErr } = useSelector(mapState);

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      navigate('/login');
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setError(userErr);
    }
  }, [userErr]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordStart({ email }));
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
