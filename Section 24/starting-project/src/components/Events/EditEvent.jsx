import {
  Link,
  redirect,
  useNavigate,
  useParams,
  useSubmit,
  useNavigation,
} from "react-router-dom";
import { /* useMutation, */ useQuery } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEvent, updateEvent, queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

/**
 * aula 403: React query advantages
 *  Nessa aula pegamos os dados do event no servidos usando useQuery(), passando o id, que foi pego usando useParams().
 *  Passamos esses dados para o EventForm que tem o código dapatado para receber colocar esses inputs no formulário do Edit.
 *  Junto com data, usamos outros dados retornados pelo useQuery como isPending, isError e error para melhorar o UX mostrando os estados da ação pedida assim o usuário não fica perdido sem saber o que estáacontecendo.
 *  Podemos ver como fica facilitado o gerenciamento de interface para mostarar estado de carregamento, ou erro. O que com UseState seria um gereciamento de diversos estados.
 * @returns
 */
/**
 * aula 405: Optimistic update
 *  To update befour the server respond
 *    Vou usar propriedade onMutate dentro do useMutation.
 *    Nela vou recisar cancelar todas as queries relacionadas aos dados que serão atualizados antes da resposta do servidor. Isso pq se tanstack fizer refetch de dados que serão atualizados otimisticamente, sses refetchs podem serem concluídos antes de a atualizaçãp ser concluid e assim pegar dados desatualizados.
 *    Aí, faremos o setQueryData, com o query id dos dados que vão ser alterados, e passando os novos dados do formulário antes de ele ir para o backend. Fazemos isso egando o parametro data que recebe todos os dados passado quando chamamos a função mutate.
 *  To rollback if editing update got some error in the backend
 *    Primeiro, precisa-se retornar os dados antigos. Fazemos isso com queryClient.getQueryData com o id dos dados em questão.
 *    Depois, adicionamos a propriedadoe onError no useMotation. Aquui iremos resetar nossos dados da query com os dados antigos. Pegamos os dados antigos através do parametro context, que é os dados retornados no onSubmit. E resetamos usando, novamente, queryClient.setQueryData, com o id dos dados.
 *    INPORTANTE: fazer o onSettled para garantir que front e back end estão sincronizados e com os mesmos dados. Pois podem acontecer diversos problemas nessa comunicação.
 *
 */
/**
 * aula407: React query vs react router
 * Nessa aula substituímos partes do código de react query para react router, afim de comparar como essas duas soluções fazem a mesma coisa.
 *  Começamos isso construindo um loader que fará o fetch do evento para por os dados do evento na tela de edição de eventos.
 *  Substituímos o useMatation pelo loader, chamando submit conforme abaixo no handleSubmit.
 *  Note que não utilizaremos mais o estado isPending.
 *  Seguindo fizemos a função action para fazer a submissão dos dados para editar o evento.
 *  Construimos a função action. Nela fazemos chamada de fetchFunction. Após isso fazemos queryClient.invalidateQuery para atualizar dados na tela.
 *  Nesse caso, parece que fica muito mais difícil de fazer atualizações otimistas.
 * Minha análise é que react query parece ser muito melhor para lidar com esdados diferentes que comunicação com servidor pode trazer.
 *
 */
export default function EditEvent() {
  const navigate = useNavigate();
  const id = useParams().id;
  const { state } = useNavigation();
  const submit = useSubmit();

  const { data, isError, error } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
    staleTime: 10000,
  });

  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     const editedEvent = data.event;
  //     await queryClient.cancelQueries({ queryKey: ["events", id] });
  //     const previuosEvent = queryClient.getQueryData(["events", id]);
  //     queryClient.setQueryData(["events", id], editedEvent);
  //     return { previuosEvent };
  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(["events", id], context.previuosEvent);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries(["events", id]);
  //   },
  // });

  function handleSubmit(formData) {
    submit(formData, { method: "PUT" });

    // mutate({ id, event: formData });
    // navigate("../");
  }

  function handleClose() {
    navigate("../");
  }

  return (
    <>
      {isError && (
        <>
          <ErrorBlock
            title="Failed to load event"
            message={
              error.info?.message || "Failed to load event, sorry bout that!"
            }
          />
          <div className="form-actions">
            <Link to="../" className="button">
              Ok
            </Link>
          </div>
        </>
      )}
      {data && (
        <Modal onClose={handleClose}>
          <EventForm inputData={data} onSubmit={handleSubmit}>
            {state === "submitting" ? (
              <p>Sending data...</p>
            ) : (
              <>
                <Link to="../" className="button-text">
                  Cancel
                </Link>
                <button type="submit" className="button">
                  Update
                </button>
              </>
            )}
          </EventForm>
        </Modal>
      )}
    </>
  );
}

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);

  await updateEvent({ id: params.id, event: updatedEventData });
  await queryClient.invalidateQueries(["events"]);
  return redirect("../");
}
