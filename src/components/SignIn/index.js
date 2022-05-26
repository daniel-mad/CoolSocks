import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectSignIn, signInUser, signInWithGoogle } from '../../features/User/userSlice';

import AuthWrapper from '../AuthWrapper';
import Button from '../Forms/Button';
import FormInput from '../Forms/FormInput';
import './styles.scss';

function SignIn() {
  const signInSuccess = useSelector(selectSignIn);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (signInSuccess) {
      resetForm();
      navigate('/');
    }
  }, [signInSuccess]);

  const navigate = useNavigate();

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSignInWithGoogle = ()=> {
    dispatch(signInWithGoogle())
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };
  return (
    <AuthWrapper headline='login'>
      <div className='formWrap'>
        <form onSubmit={handleSubmit}>
          <FormInput
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type='submit'>Login</Button>
          <div className='socialSignin'>
            <div className='row'>
              <Button onClick={handleSignInWithGoogle}>Sign in with Google</Button>
            </div>
          </div>
          <div className='links'>
            <Link to='/recovery'>Reset Password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
}

export default SignIn;
