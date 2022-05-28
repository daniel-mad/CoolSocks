import React, { useEffect, useState } from 'react';
import FormInput from '../Forms/FormInput';
import Button from '../Forms/Button';
import './styles.scss';
import AuthWrapper from '../AuthWrapper';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUserStart } from '../../features/User/userSlice';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr,
});

function Signup() {
  const { currentUser, userErr } = useSelector(mapState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [displayName, setdDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentUser) {
      resetForm();
      navigate('/');
    }
  }, [currentUser]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

  const resetForm = () => {
    setdDisplayName('');
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
    setErrors([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signUpUserStart({ displayName, email, password, passwordConfirm })
    );
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
