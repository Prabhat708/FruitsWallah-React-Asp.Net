import { MdDelete } from "react-icons/md";
import { PlusMinusButton } from "../services/CartFeatures";
const CartRow = ({ item, onDelete }) => {
  return (
    <>
      <tr>
        <td>
          <img src={item?.productImg} alt="No Img" style={{ width: "50px" }} />
        </td>
        <td>{item?.productName}</td>
        <td>&#8377;{item?.productPrice}</td>
        <td>
          <div className="d-flex align-items-center">
            <button
              className={`rounded text-success border-0 fw-bold ${item?.productQuantity === 1
                  ? "disabled"
                  : ""
              }`}
              onClick={() => {
                  PlusMinusButton(item?.cartId, "decrement", item?.productQuantity);
              }}
              disabled={
                  item?.productQuantity === 1
              }
            >
              -
            </button>

            <span className="mx-2 fw-bold text-success">
              {
                item?.productQuantity
              }
            </span>
            <button
              className=" rounded text-success border-0 fw-bold"
              onClick={() => {
                PlusMinusButton(item?.cartId, "increment", item?.productQuantity);
              }}
            >
              +
            </button>
          </div>
        </td>
        <td>
          &#8377;
          {item?.productPrice *
              item?.productQuantity}
        </td>
        <td>
          <button className="btn border-danger text-danger rounded-pill">
            <MdDelete onClick={() => onDelete(item?.cartId)} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default CartRow;
