import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  emailSignInStart,
  googleSignInStart,
} from '../../features/User/userSlice';

import AuthWrapper from '../AuthWrapper';
import Button from '../Forms/Button';
import FormInput from '../Forms/FormInput';
import './styles.scss';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

function SignIn() {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (currentUser) {
      resetForm();
      navigate('/');
    }
  }, [currentUser]);

  const navigate = useNavigate();

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSignInWithGoogle = () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
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
              <Button onClick={handleSignInWithGoogle}>
                Sign in with Google
              </Button>
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
