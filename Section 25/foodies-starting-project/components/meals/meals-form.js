"use client";

import { useFormStatus } from "react-dom";

/**
 * aula 446: Melhorando UX da pagina share
 *  Para que o UI indique que a ação pedida está em andamento fizemos este componenteseparado, para que ele possa ser um front_end react componet. Isso pq ele precisa usar a biblioteca o react-dom, que não pode ser executada no back_end.
 *  Logo, para não precisarmos carregar a página interira do share, pois, se não, perderemos as vantagens do server react components, separamos o botão neste componente que vai ser carregado especificamente no navegador
 */

export default function MealsFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? "Submitting..." : "Share Meal"}
    </button>
  );
}
