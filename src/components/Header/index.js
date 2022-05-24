import { signOut } from 'firebase/auth';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/utils';
import './styles.scss';

function Header(props) {
  // const { currentUser } = props;
  const currentUser = useSelector((state) => state.user.currentUser);
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
                <Link to='#' onClick={() => signOut(auth)}>
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
