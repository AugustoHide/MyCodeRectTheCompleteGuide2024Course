import React, { useState } from "react";
import TodoModel from "../models/TodoModel";

type TodosObjCtx = {
  items: TodoModel[];
  addTodo: (todoText: string) => void;
  removeTodo: (id: string) => void;
};
type Props = { children: React.ReactNode };

export const TodosContext = React.createContext<TodosObjCtx>({
  items: [],
  addTodo: () => {},
  removeTodo: (id: string) => {},
});

const TodosContextProvider: React.FC<Props> = (props) => {
  const [todos, setTodos] = useState<TodoModel[]>([]);

  const addTodoHandler = (todoText: string) => {
    const NewTodo = new TodoModel(todoText);
    setTodos((prevTodos) => {
      return prevTodos.concat(NewTodo);
    });
  };

  const removeTodoHandler = (id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const contextValue: TodosObjCtx = {
    items: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
  };
  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};
export default TodosContextProvider;
