import React, { useRef, useContext } from "react";

import { TodosContext } from "../store/todos-context";
import classes from "./NewTodo.module.css";

/**
 *  Aula 565: Form submitions on TS
 *  Nesta aula decidimos usar a estratégia de usar useRef para quando formos submeter um novo Todo digitado pelo usuário.
 *  Para isso criamos uma função submitHandler que irá fazer a submissão quando o form for submetido.
 *  Nesta função precisamos definir o tipo do parametro que neste caso é React.FormEvent, o tipo de FormEvent exato que está definido no React para o TS.
 *  Assim, podemos usar a prédfinição quando form digitar os métodos do evento recebido, como no caso preventDefault().
 *  Além disso, temos a conferencia pela ide de que estamos chamando o submitHandler dentro da especificação correta. Por exemplo, não poderemos chamar submitHandler em onSubmit quando recebemos MouseEvent. TS confere essa diferença de tipagem e identifica inconsistências.
 */
/**
 *  Aula 566: Refs & useRefs
 *  Para usarmos o useRef, precisamos definir o generic do elemento html que ira utilizar o ref, neste caso é o HTMLInputElement. Se fosse para outros elementos html, teríamos que pesquisar no google qual o generic do elemnto.Além disso precsamos definir um valor inicial para o useRef, que como não temos deve ser definido como null.
 *  É assim que se feve usar useRefs com TS.
 *
 * Ao utilizar o ref definido, o TS analisa que podemos utilizar o ref antes de o elemento ser renderidado, ou seja, antes de o ref fazer sua conexçao com o o elemento que vai utilizar o o ref.
 *  Se fizermos isso antes da renderização, o current não terá o campo value, logo será retornado null. Por isso o TS coloca o ?., para cobrir este caso.
 *  Mas, se tivermos certeza de que teremos o value definido, podemos utilizar !., para idicar que o tipo será o do ref com sucesso, neste caso string.
 */
/**
 *  Aula 567: Function props
 *  Nesta aula aprendi a passar funcções  como parâmetro props no TS. Para isso definimos o tipo função conforme a baixo, () => tipo de retorno. que não declara uma função nova, mas define o tipo da variável como uma função com o seu tipo de retorno.
 *  Importante relembrar que no TS também é necessário definir o tipo dos parâmetros da função.E chamar a função conforme o tipo e definição, se não ocorrerá erros.
 */

const NewTodo: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  const todoTextInput = useRef<HTMLInputElement>(null);

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    const enteredText = todoTextInput.current!.value;

    if (enteredText.trim().length === 0) return;

    todosCtx.addTodo(enteredText);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <label htmlFor="text">Todo text</label>
      <input type="text" id="text" ref={todoTextInput} />
      <button>Add todo</button>
    </form>
  );
};

export default NewTodo;
