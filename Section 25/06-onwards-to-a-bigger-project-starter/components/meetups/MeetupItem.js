import { useRouter } from "next/router";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";

/**
 * aula 469: Programatic Imperative Navigation
 *  to configure 'manually'/rogramatically a link, you can setup a handler function and, inside use router.push(url path to be directed).
 *  Being router = useRoute() from next/router.
 */

function MeetupItem(props) {
  const router = useRouter();

  function showDetailsHandle() {
    router.push("/" + props.id);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandle}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
