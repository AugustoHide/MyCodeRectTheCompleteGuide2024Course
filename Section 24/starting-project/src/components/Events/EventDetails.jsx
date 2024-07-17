import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { fetchEvent, deleteEvent } from "../../util/http.js";
import { queryClient } from "../../util/http.js";
import Header from "../Header.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Modal from "../UI/Modal.jsx";
/**
 * aula 402: para melhorar o UX, decidiu-se fazer uma caixa de dialogo onde se confirma a detelação do evento.
 *  Para isso, fizemos um state chamado isDeleting, que será um boolean indicando se o Modal com o dialogo de confirmação vai aparecer ou não.
 *  Logo, o botão de deletar chama a função handleStartDelete, que uda isDeleting = true, e consequentemente mostra o Modal.
 *  E, o botão de delete dentro do modal de confirmação que vai chamar handleDelete.
 *  Enquanto,  botão handleStopDelete é chamado quando clicado o botão de Cancelar dentro do Modal.
 *  Além disso precisou fazer so do IsPending, e IsError para melhorar UX retornando definição da ação pedida, se está carregando ou se deu erro.
 * @returns
 */

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);

  const id = useParams().id;
  const navigate = useNavigate();
  const {
    data: event,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigate("/events");
    },
  });
  function handleDelete() {
    mutate({ id });
  }

  function handleStartDelete() {
    setIsDeleting(true);
  }
  function handleStopDelete() {
    setIsDeleting(false);
  }

  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure?</h2>
          <p>
            Do you really want to delete this event. This action can not be
            undone
          </p>
          <div className="form-actions">
            {isPendingDeletion && <p>Deleting, Just a minute...</p>}
            {!isPendingDeletion && (
              <>
                <button onClick={handleStopDelete} className="button-text">
                  Cancel
                </button>
                <button onClick={handleDelete} className="button">
                  Delete
                </button>
              </>
            )}
          </div>
          {isErrorDeleting && (
            <ErrorBlock
              title="Failed to delete event"
              message={
                deleteError.info?.message ||
                "Faile to delete event. Sorry about that!"
              }
            />
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {isPending && (
        <div id="event-details-content" className="center">
          Fetching event data...
        </div>
      )}
      {isError && (
        <div id="event-details-content" className="center">
          <ErrorBlock
            title="Failed to load event"
            message={
              error.info?.message || "Failed to fetch event data. Sorry!!"
            }
          />
        </div>
      )}
      {event && (
        <article id="event-details">
          <header>
            <h1>{event.title}</h1>
            <nav>
              <button onClick={handleStartDelete}>Delete</button>
              <Link to="edit">Edit</Link>
            </nav>
          </header>
          <div id="event-details-content">
            <img
              src={`http://localhost:3000/${event.image}`}
              alt={event.title}
            />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{event.location}</p>
                <time dateTime={`Todo-DateT$Todo-Time`}>
                  {new Date(event.date).toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  @ {event.time}
                </time>
              </div>
              <p id="event-details-description">{event.description}</p>
            </div>
          </div>
        </article>
      )}
    </>
  );
}
