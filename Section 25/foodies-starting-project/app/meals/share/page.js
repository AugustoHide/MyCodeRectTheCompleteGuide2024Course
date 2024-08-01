"use client";

import { useFormState } from "react-dom";
import ImagePicker from "@/components/meals/image-picker";
import classes from "./page.module.css";
import { shareMeal } from "@/lib/actions";
import MealsFormSubmit from "@/components/meals/meals-form";

/**
 * aula 442: Server actions ffor handling form submintion
 *  serveaction são definidos por funções que sejam async e tenham a tag 'use server'. Definindo isso dá para usar essa função como action de uma form , que será executada no servidor.
 *  action functions recbem formData. É importante lembrar que para cessar os dados do formData, deve-se seguir o nome definido no form.
 */
/**
 * aula 448: server action responses + useFormState
 *  Para etornar responses do servidor, basta retornar na função action um obj com os dados que serão retornados.
 *  E, então, no componente em que sestará o formulário que receberá o response do action que foi chamado para submeter requests, deve-se usar useFormState para lidar com essa response do action que executará no servidor.
 *  o useFormState, recebe como parametro
 *    a função action que o form irá executar
 *    o estado inicial do estado de execução do form
 *  e retornará
 *    o estado de excução, que será definido no action
 *    a nova função action que o form deverá chamar ao ser submetido.
 *  Usando o useFormAction, conseguimos pegar feedback da submissão dos dados no form, retornando error personalizados, etc
 */

export default function ShareMealPage() {
  const [state, formAction] = useFormState(shareMeal, { message: null });
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          IMAGE PICKER
          <ImagePicker label="Your image" name="image" />
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
