import Image from "next/image";
import classes from "./page.module.css";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

/**
 * aula 436: rendering meal details
 *  Nesta aula criamos a função getMeal no arquivo meals. dentro da pasta lib.
 *  E, tb criamos a função componente que mostra em detalhes o meal.
 *  Dentro da função componente chamamos o getMeal(parametro.nome-da-variavel) e aplicamos os dados retornado na interface
 */
/**
 * aula 454: dynamic defining metadata
 *  Para as páginas que receberão diferentes dados, podemos definir diferentes metadata de forma dinamica.
 *  Para isso basta definir e exportar uma função assíncrona com  o nome gegerateMetadata que o next já irá identificar como função de definição de metadata.
 *  Esta função irá receber como parâmetro, os mesmos parâmetros da função react componente.
 *  Com este parâmetro da para definir os metadatas dinamicamente.
 */
export async function generateMetadata({ params }) {
  const meal = getMeal(params.meal);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default function MealPage({ params }) {
  const meal = getMeal(params.meal);

  if (!meal) {
    notFound();
  }
  meal.instructions = meal.instructions.replace(/\n/g, "<br/>");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={`https://augustohide-nextjs-demo-users-image.s3.amazonaws.com/${classes.image}`}
            alt={meal.title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto: ${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}
