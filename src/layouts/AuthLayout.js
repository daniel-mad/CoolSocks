import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function AuthLayout(props) {
  return (
    <div className="fullHeight">
      <Header {...props} />
      <div className="main-auth">{props.children}</div>
      <Footer />
    </div>
  );
}

export default AuthLayout;
