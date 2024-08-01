"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

/**
 * aula 443: server actions in separate files
 *  decidimos passar o action function para sse arq por que pode haver uma confusão do código que vai ser executado no front com o código que será executado no back. Essa confusão pode trazer vulnerabilidade para o sistema.
 *  Além de poder haver uma incompatibilidade de 'use server' com código que precisa ser 'use client'
 */
/**
 * aula 450: cache revalidations
 *  Quando há mudanças e precisamos fazer atualizações de páginas, usamos o revalidatePath.
 *  o revalidatePath irá apagar s dados préprocessados na cache, e irá reexecutar a página indicada no parametro.
 *  Ele recebe como parametro
 *    o caminho url que deverá ser ser apagado da cache, para ser reexecutado
 *    segundo parâmetro que indica se deve apagar tb os dados das  url filhas da indicada no primeiro parametro
 *      layout: indica que deverá ser apagado as url filhas
 *      page: padra. Indica que não deverá revalidar paths filhas
 */
/**
 * aula 451: não salve arquivos no public
 *  Isso pq a pasta public não é considerada quando o projeto vai para modo produção. Logo arquivos salvos depois de executar npm run built não serão considerados.
 *
 */
function isInvalidText(text) {
  return !text || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input",
    };
  }
  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
