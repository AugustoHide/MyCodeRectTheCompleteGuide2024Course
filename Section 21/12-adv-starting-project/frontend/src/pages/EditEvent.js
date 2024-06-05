import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function EditEventPage() {
  const event = useRouteLoaderData("event-detail").event;
  return <EventForm method="patch" event={event} />;
}
