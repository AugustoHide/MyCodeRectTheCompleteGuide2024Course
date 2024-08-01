/**
 * aula 432: Loading page
 *  Nesta aula adicionamos este arquivo, que tem nome reservado, logo Nextjs já adiciona ele quando os conteúdos demoram para carregar, automaticamente. Assim melhoramos o UX.
 *  Aqui adicionamos estilos prontos dados pelo instrutor.
 */

import classes from "./loading.module.css";

export default function MealsLoadingPage() {
  return <p className={classes.loading}>Fetching meals...</p>;
}
