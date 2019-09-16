import React from 'react';
import './ServerError.css';

const ShowServerError = props => {
  if (!props.error) {
    console.log('API is working');
  }
  return (
    <div className='Alert'>
      <h3>Server Error - 'https://api.thecatapi.com' is down</h3>
      {props.error instanceof window.Response ? (
        <p>
          <b>{props.error.url}</b>
        </p>
      ) : (
        <p>
          <code>{props.error}</code>
        </p>
      )}
    </div>
  );
};

export default ShowServerError;
