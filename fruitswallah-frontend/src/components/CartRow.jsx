import React, { use, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CartRow = ({ item, onDelete }) => {
 
  return (
    <>
      <tr>
        <td>
          <img src={item.image} alt="" style={{ width: "50px" }} />
        </td>
        <td>{item.name}</td>
        <td>&#8377;{item.price}</td>
        <td>{item.quantity}</td>
        <td>&#8377;{item.price * item.quantity}</td>
        <td>
          <button className="btn border-danger text-danger rounded-pill">
            <MdDelete onClick={() => onDelete(item.id)} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default CartRow;
