import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutUserStart, userRemoved } from '../../features/User/userSlice';

import './styles.scss';

function Header(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const logOut = () => {
    dispatch(signOutUserStart());
  };
  return (
    <header className='header'>
      <div className='h-wrap'>
        <Link to='/'>
          <h3 className='logo'>COOL SOCKS</h3>
        </Link>

        <div className='callToActions'>
          {currentUser && (
            <ul className='nav-items'>
              <li>
                <Link to='/dashboard'>My account</Link>
              </li>
              <li>
                <Link to='#' onClick={logOut}>
                  Logout
                </Link>
              </li>
            </ul>
          )}
          {!currentUser && (
            <ul className='nav-items'>
              <li>
                <Link to='/registration'>Register</Link>
              </li>
              <li>
                <Link to='/login'>login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
