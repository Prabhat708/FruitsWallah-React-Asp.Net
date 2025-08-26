import React from "react";
import { MdDelete } from "react-icons/md";

const CartRow = ({item}) => {
  return (
    <>
      <tr>
        <td>
                  <img src={
                      item.image
          } alt="" style={{ width: "50px" }} />
        </td>
        <td>{item.productName}</td>
        <td>&#8377;{item.productPrice}</td>
        <td>{item.productQuantity}</td>
        <td>&#8377;{item.productPrice * item.productQuantity}</td>
        <td>
          <button className="btn border-secondary rounded-pill">
            <MdDelete />
          </button>
        </td>
      </tr>
    </>
  );
};

export default CartRow;
