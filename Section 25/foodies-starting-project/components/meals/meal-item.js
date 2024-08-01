import Link from "next/link";
import Image from "next/image";

import classes from "./meal-item.module.css";

/**
 * aula 429: Outputting meals data & images
 *  Nessa aula adicionamos vários arquivos prontos como meals-grid e mealsitem e suas respectiba estilizações.
 *  Aqui no meal-item, o tratamento de imagens com a tag Image da biblioteca Next deve, sempre que souber, definir o width e height. Mas, aqui, como não sabemos o tamanho da imagem previamente, definimos o prop fill.
 */

export default function MealItem({ title, slug, image, summary, creator }) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image
            src={`https://augustohide-nextjs-demo-users-image.s3.amazonaws.com/${image}`}
            alt={title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
