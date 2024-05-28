import { useDispatch, useSelector } from "react-redux";

import classes from "./CartButton.module.css";
import { uiActions } from "../../store/uiSlice";

const CartButton = (props) => {
  const cartItemsQuantity = useSelector((state) => state.cart.items.length);
  // console.log(cartItemsQuantity);

  const dispatch = useDispatch();

  function handleCartToggle() {
    dispatch(uiActions.toggle());
  }

  return (
    <button className={classes.button} onClick={handleCartToggle}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItemsQuantity}</span>
    </button>
  );
};

export default CartButton;
