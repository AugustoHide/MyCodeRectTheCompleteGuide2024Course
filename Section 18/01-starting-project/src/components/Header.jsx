import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../context/CartContext";
import UserProgressContext from "../context/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumOfItems, item) => {
    return totalNumOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="Restaurante de hamburger" />
        <h1>Hamburgeria</h1>
      </div>
      <Button onClick={handleShowCart} textOnly>
        Cart ({totalCartItems})
      </Button>
    </header>
  );
}
