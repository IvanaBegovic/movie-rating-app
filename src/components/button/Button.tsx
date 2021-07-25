import React from 'react';
import './button.scss';

function Button({
                  text = '',
                  disabled = false,
                  onClick = () => {
                  }
                }) {

  return (
    <div className="button">
      <button disabled={disabled}
              className='button__button'
              onClick={onClick}>
        {text}
      </button>
    </div>
  );
}

export default Button;

