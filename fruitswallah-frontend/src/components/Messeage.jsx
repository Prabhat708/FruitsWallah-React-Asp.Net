import React from 'react'

const Messeage = ({message}) => {
  return (
    <>
      <div className='container' style={{marginTop:"100px",marginBottom:"0px"}}>
        <div
          class="alert alert-success alert-dismissible fade show "
          role="alert"
        >
          {message}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </>
  );
}

export default Messeage
