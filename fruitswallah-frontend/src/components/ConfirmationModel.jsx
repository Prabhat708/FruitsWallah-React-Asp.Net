import React from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { HandleLogout } from "../services/HandleLoginLogout";

const ConfirmationModel = ({
  tital,
  setShowConfirmModal,
  alertmsg,
  notemsg,
  cancelmsg,
  proceedbtn,
}) => {

    const handleDelete = async () => {
        const response = await handleDeleteAccount();
        HandleLogout(navigate);
      };
    const handleConfirm = async () => {
        handleDelete();
          setShowConfirmModal(false);
      };
  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-danger shadow">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">{tital}</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setShowConfirmModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p className="fw-semibold">{alertmsg}</p>
              <div
                className="alert alert-danger d-flex align-items-start mt-3"
                role="alert"
              >
                <div>
                  <BsFillLightningChargeFill className="me-2" />
                  {notemsg}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowConfirmModal(false)}
              >
                {cancelmsg}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleConfirm}
              >
                {proceedbtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModel;
