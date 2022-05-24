import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, signInWithGoogle } from '../../firebase/utils';
import AuthWrapper from '../AuthWrapper';
import Error from '../Errors';
import Button from '../Forms/Button';
import FormInput from '../Forms/FormInput';
import './styles.scss';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(auth.currentUser);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      setError(null);
    } catch (err) {
      setError(err.message);
    }
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
              <Button onClick={signInWithGoogle}>Sign in with Google</Button>
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
