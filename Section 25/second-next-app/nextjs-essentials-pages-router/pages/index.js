// domain-name.com/

import Link from "next/link";
import { Fragment } from "react";

/**
 * aula 459: adding first pages
 *  Aqui adicionamos 3 páginas, a página home e news, sendo que a news detaiol ainda será criada.
 *  Tb vimos que em apps Nextjs, não é necessário importar a rect.
 *  O nome do arquivo será o caminho da url que a página será mostrada. Sendo index.js o arquivo para o caminho inicial
 */

function HomePage() {
  return (
    <Fragment>
      <h1>Home Page</h1>
      <ul>
        <li>
          <Link href="/news/great-framework">NextJs is Great Framework</Link>
        </li>
        <li>Whatever Else</li>
      </ul>
    </Fragment>
  );
}

export default HomePage;
