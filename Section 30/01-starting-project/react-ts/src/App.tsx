import "./App.css";
import NewTodo from "./components/NewTodo";
import Todos from "./components/Todos";
import TodosContextProvider from "./store/todos-context";
/**
 *  Aula 568: useState + TS
 *  Se usarmos useState como usamos no JS, o TS irá fazer uma iferência de tipo a partir do tipo dado inicialmente. Isto pode trazer problemas pois, caso o valor inicial seja um array vazio, o TS entende  tipo como never[], ou seja uma array que será sempre vazia, o que não é o caso.
 *  Por isso é recomendado fazer a definição do tipo pelo generics <{definição do tipo de dado que a variável que armazenará o state terá}> assim não poderá ocorrer confusões como acima.
 *
 *  Para terminar de adicionar novos todos a lista de todos, dentro da função addTodoHandler, criamos um novo Todo, instanciando um obj a partir da classe definida no modelo.
 *  Depois, para por na lista, utilizamos o setTodos, para atualizar a tela e os dados ao mesmo tempo. Para isso, precisamosutilizar uma função, pois vamos mudar estados a partir de estados anterior, e como convenção é mais 'saudável' fazer essa mudança dentro de uma função que retorno o novo dado.
 */

function App() {
  return (
    <TodosContextProvider>
      <NewTodo />
      <Todos />
    </TodosContextProvider>
  );
}

export default App;
