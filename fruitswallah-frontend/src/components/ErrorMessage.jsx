import React from 'react'

const ErrorMessage = ({message}) => {
  return (
    <>
          <div className="alert alert-danger">{ message}</div>
    </>
  );
}

export default ErrorMessage
