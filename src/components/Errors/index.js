import React from 'react';
import './styles.scss';

function Error({ msg, type }) {
  return (
    <div className={`alert alert-${type}`}>
      <h2>{msg}</h2>
    </div>
  );
}

export default Error;
