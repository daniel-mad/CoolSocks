import React from 'react';
import './styles.scss';

function FormInput({ label, ...otherProps }) {
  return (
    <div className='formRow'>
      {label && <label>{label}</label>}
      <input className='formInput' {...otherProps} />
    </div>
  );
}

export default FormInput;
