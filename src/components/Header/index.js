import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

function Header() {
  return (
    <header className="header">
      <div className="wrap">
        <Link to="/">
          <h3 className="logo">COOL SOCKS</h3>
        </Link>

        <div className="callToActions">
          <ul>
            <li>
              <Link to="/registration">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
