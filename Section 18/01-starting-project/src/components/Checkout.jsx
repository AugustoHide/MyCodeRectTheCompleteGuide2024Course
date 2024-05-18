import { useContext } from "react";
import CartModal from "./UI/CartModal";
import CartContext from "../context/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../context/UserProgressContext";
import useHttp from "./hooks/useHook";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const UserProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  function handleClose() {
    UserProgressCtx.hideCheckout();
  }

  function handleFinish() {
    UserProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);

    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isSending) {
    actions = <span>Sending order...</span>;
  }

  if (data && !error) {
    return (
      <CartModal
        open={UserProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success</h2>
        <p>Your order was submitted!!!</p>
        <p className="odal-actions">
          <Button onClick={handleFinish}>Ok</Button>
        </p>
      </CartModal>
    );
  }

  return (
    <CartModal
      open={UserProgressCtx.progress === "checkout"}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amout: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full name" type="text" id="name" />
        <Input label="Email adress" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="CEP" type="number" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Faield to submit your order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </CartModal>
  );
}
