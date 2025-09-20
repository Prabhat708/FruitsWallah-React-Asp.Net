import React from 'react'

const AlertMessage = ({ status,message }) => {
  return (
    <>
      <div
        className={`alert ${status ? "alert-success" : "alert-danger"}`}
        style={{ marginTop: "100px" }}
      >
        {message}
      </div>
    </>
  );
};

export default AlertMessage
