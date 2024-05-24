import { useDispatch } from "react-redux";
import { authenticationActions } from "../store/auth";

import classes from "./Auth.module.css";

const Auth = () => {
  const dispatch = useDispatch();

  function handleLogin(event) {
    event.preventDefault();
    const loginData = Object.fromEntries(new FormData(event.target).entries());
    dispatch(authenticationActions.login(loginData));
  }

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={handleLogin}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
