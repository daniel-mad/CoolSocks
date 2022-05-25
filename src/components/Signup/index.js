import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, handleUserProfile } from '../../firebase/utils';
import React, { useState } from 'react';
import FormInput from '../Forms/FormInput';
import Button from '../Forms/Button';
import './styles.scss';
import AuthWrapper from '../AuthWrapper';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [displayName, setdDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const resetForm = () => {
    setdDisplayName('');
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
    setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setErrors([`Password Dont't Match`]);
      return;
    }
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await handleUserProfile(user, { displayName });
      resetForm();
      navigate('/');
    } catch (error) {
      setErrors([error.message]);
    }
  };

  return (
    <AuthWrapper headline='registration'>
      <div className='formWrap'>
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return <li key={index}>{err}</li>;
            })}
          </ul>
        )}

        <form onSubmit={handleSubmit}>
          <FormInput
            type='text'
            name='displayname'
            value={displayName}
            placeholder='Full Name'
            onChange={(e) => setdDisplayName(e.target.value)}
          />
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
          <FormInput
            type='password'
            name='confirmPassword'
            value={passwordConfirm}
            placeholder='Confirm password'
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <Button type='submit'>Register</Button>
        </form>
      </div>
    </AuthWrapper>
  );
}

export default Signup;
