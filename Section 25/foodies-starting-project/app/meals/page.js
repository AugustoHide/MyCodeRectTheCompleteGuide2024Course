import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";
/**
 * aula 433: using suspense
 *  Aqui usamos o suspense da biblioteca do react, que carrega ballback enquanto o elemento dentro da tag demora para carregar.
 *  Agrupamos em uma unica função que virou uma função de componente react, que irá pedir os dados das imgs, que irá demorar, e retornará o MealsGrid com as Imgs retornadas.
 * É  importante lembrar que o loagin.module.css tb aplica as paginas filhas, logo ele deve estar nas páginas mais filhas possível.
 */
/**
 * aula 449: NextJs caching & production
 *  O Nextjs pré-excuta todas as páginas que ele puder antes de alguém acessar.
 *  Aí ele salva essas páginas num cache do servidor e não executa as páginas novamente.
 *  Isso afeta as atualizações e mudanças conforme interações no app são feitas, pois as páginas não reexecutadas.
 */
/**
 * aula453: defining metadata
 *  Para definir metadata de páginas no next, é só exportar constante com nome metadata.
 *  O metadata vai definir dados para o browser como título que vai aparecer na aba do browser
 */
export const metadata = {
  title: "All Food",
  description: "Browse meals, shared by a food-loving community.",
};

async function Meals() {
  const meals = await getMeals();
  console.log("Fetching meals");

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}> by you</span>
        </h1>
        <p>
          Choose your favorite ecipe and cook it yourself. It is easy and fun.
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
