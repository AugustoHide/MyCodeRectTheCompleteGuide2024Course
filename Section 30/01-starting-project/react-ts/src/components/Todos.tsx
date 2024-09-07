import React, { useContext } from "react";
import TodoItem from "./TodoItem";
import classes from "./Todos.module.css";
import { TodosContext } from "../store/todos-context";

/**
 *Aula 562: Components + TS
    Para usar componentes react em TS temos que definir o tipo usando 
    React.FC, que representa o tipo function component do react no TS.
    Este React.FC é uma definição meio geral do que é um componente de função React. Para especificar os props precisamos defnir entre <> o formato específico do props que este componente em específico irá receber, como definido abaixo.
    A vantagem de tudo issp é que, ao definirmos os tipos previamente, o IDE já sabe quais métodos embutidos podemos utilizar para aquele tipo em específico, como map, para arrays neste exemplo.Para tornar um prop opcional podemos por ? após o nome do prop.
    A tipagem do Ts ajuda a 'pegar' erros de tipagem de dados, que antes, somente com JS puro era muito difícil
 */
/**
 *  Aula 563: Adding a data model
 *  Para adicionar um modelo de tipo de dado mais complexo, decidiu-se criar um arquivo dentro de uma pasta chamada models, que indica  lugar onde deicaremos os modelos de dados que vamos utilizar. como o modelo que usamos neste ecemplo é mais complexo, fizemos separado.
 *  Nele, criamos uma class, em que pelo fato de ser em TS, é obrigatório definir as propriedades e seus tipos. Tb, é obrigatório definir o constructor, e os tipos dos parâmetros passados. Além de ser obrigatório tb, definir os valores de todos as propriedades da classe no constructor.
 *  Para criar dados utilizando o modelo de dados definido no models, istanciamos a class feito com o new ClassName(parametros).
 *  Para utilizarmos o modelo de dados para definir o o modelo de dados em outras estruturas, como na função componente abaixo por exemplo, importamos o modelo e colocamos o nome para definir os dados conforme o modelo chamado.
 *
 * Fazendo isso, temos a vantagem de identificar erros na fase de desenvolvimento que antes só seriam identificados na execução do app.
 */

const Todos: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  return (
    <ul className={classes.todos}>
      {todosCtx.items.map((item) => (
        <TodoItem item={item} onRemove={todosCtx.removeTodo} />
      ))}
    </ul>
  );
};

export default Todos;
