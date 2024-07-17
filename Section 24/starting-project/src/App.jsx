import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import Events from "./components/Events/Events.jsx";
import EventDetails from "./components/Events/EventDetails.jsx";
import NewEvent from "./components/Events/NewEvent.jsx";
import EditEvent, {
  loader as editEventLoader,
  action as editEventAction,
} from "./components/Events/EditEvent.jsx";
import { queryClient } from "./util/http.js";

/**
 * Na aula 397, escolheu-se mudar o querClient para o arquivo http.js. Isso pois o cliente será preciso para reatualizar os eventos no Recently added. Para isso se utilizou o queryClient.
 *
 */

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/events" />,
  },
  {
    path: "/events",
    element: <Events />,

    children: [
      {
        path: "/events/new",
        element: <NewEvent />,
      },
    ],
  },
  {
    path: "/events/:id",
    element: <EventDetails />,
    children: [
      {
        path: "/events/:id/edit",
        element: <EditEvent />,
        loader: editEventLoader,
        action: editEventAction,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
