import React from "react";
import TodoModel from "../models/TodoModel";
import classes from "./TodoItem.module.css";

/**
 *  Aula 564: Practice
 *  Nesta aula refiz a utilização do model na aula ppassada para treinar os conceitos de TS.
 *  Para isso, construí a função componente TodoItem para exibir individualmente cada  item de todo. Nele defini o tipo com React.FC, para definir o tipo no TS como função componente react. e para definir o tipo do parâmetro defini o nome item e utilizei o modelo TodoModel.
 *  Para especificar melho o nome do modelo de dados todo, mudei o nome de Todo para TodoModel a fim de não ter confusão nos nomes.
 *  Além disso especifiquei o item nos parâmetros para que não precise escrever props.item toda hora.
 *  Importante ressatar que se utilizasse props, poderia definir outros props elementares/básico/comuns como key, sem ser necessário definir isso abaixo.
 */
const TodoItem: React.FC<{
  item: TodoModel;
  onRemove: (id: string) => void;
}> = (props) => {
  return (
    <li
      className={classes.item}
      key={props.item.id}
      onClick={() => props.onRemove(props.item.id)}
    >
      {props.item.text}
    </li>
  );
};

export default TodoItem;
