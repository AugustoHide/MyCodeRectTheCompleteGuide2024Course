import { Link } from "react-router-dom";

import classes from "./Post.module.css";

export default function Post({ id, author, body }) {
  return (
    <li className={classes.post}>
      <Link to={id}>
        <h2 className={classes.author}>{author}</h2>
        <p className={classes.text}>{body}</p>
      </Link>
    </li>
  );
}
