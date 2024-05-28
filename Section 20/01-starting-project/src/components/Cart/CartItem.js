import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";
import { cartActions } from "../../store/cart";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const { title, quantity, total, price } = props.item;

  function handleAddQuantity() {
    dispatch(cartActions.addItem(props.item));
  }

  function handleRemoveQuantity() {
    dispatch(cartActions.removeItem(title));
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleRemoveQuantity}>-</button>
          <button onClick={handleAddQuantity}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
