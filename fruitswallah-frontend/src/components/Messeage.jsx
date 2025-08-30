import React from "react";

const Messeage = ({ message, username, comingFrom }) => {
  return (
    <>
      <div
        className="container"
        style={{ marginTop: "100px", marginBottom: "0px" }}
      >
        <div
          className="alert alert-success alert-dismissible fade show "
          role="alert"
        >
          {comingFrom === "signup" && (
            <>
              <h6>Congratulations! {username}</h6>
              {message}
            </>
          )}
          {comingFrom === "login" && (
            <>
              <h6>Welcome back! {username}</h6>
              {message}
            </>
          )}
          {comingFrom === "LogOut" && (
            <>
              <h6>Thank You!</h6> {message}
            </>
          )}
          {comingFrom === "addToCart" && <>{message}</>}
          {comingFrom === "" && <>{message}</>}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </>
  );
};

export default Messeage;
