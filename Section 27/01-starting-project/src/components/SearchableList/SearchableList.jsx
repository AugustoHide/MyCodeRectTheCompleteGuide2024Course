import { useState, useRef } from "react";
/**
 * aula 520: Working with debouncing
 *  Nesta aula prendi que deboucing é um mecanismo para que se limite o nùmero de buscas 'no bd' pois isso pode causar perda de desempenho no sistema.
 *  Para isso, neste exemplo, limitamos a busca a cada 0,5s, através do setTimeout. É importante lembrar de retirar o id do setTimeout da variável para que quando o tempo expirar na proxima busca ele não enteda como não sendo o último dígito do usuário.
 *  Para que lidemos com cada mudança no campo de busca de forma que somente quando o usuário parar de digitar ocorrar a busca de fato, fazemos uma condicional, para desativar o setTimeout.
 */
export default function Searchablelist({ items, itemKeyFn, children }) {
  const lastChange = useRef();
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleChange(event) {
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setSearchTerm(event.target.value);
    }, 500);
  }

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleChange} />
      <ul>
        {searchResults.map((item) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}
