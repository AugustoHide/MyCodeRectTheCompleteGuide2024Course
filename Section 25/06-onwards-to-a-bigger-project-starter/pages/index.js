// import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

/**
 * aula 466: outputting list of meetups
 *  Para criar páginas basta criar arquivos js dentro da pasta pages, que next automaticamente cria página no endereço com nome do arquivo, ou pasta com arquivo index.js dentro.
 *  Outros componentes react fora dessa pasta são somente comopnete e precisam ser usados dentro de uma page para aparecer na tela de usuario
 */
/**
 * aula 471: Pre-rendering and multi-cycle problems
 *  Quando precisamos pegar dados do backend e fazemos usando o useEffect. Vemos que o useEffect só vai executar depois do componente em que ele está for executado.
 *  Logo, na primeira vez que o componente que vai usar dados do back-end com useEffect renderizar, ele estará sem os dados do back-end. E então, depois da primeira renderização, que o useEffectExecuta.
 *  Isto é um problema gravíssimo pois o next pre-renderiza, logo o html enviado pro navegador será o inicial, sem os dados do back-ens.
 *  Este detalhe irá prejudicar o site no SEO, pois o html no browser não terá os dados, será uma página vazia.
 */
/**
 * aula 472: dta fetching for static page
 *  No next quando fazemos um request, next vai por padrão retornar paginá prérenderizada.
 *  E, então, react vai pegar gar dados do back-end/idratar o código.
 *  Logo, o código inicial não tem os dados do back-end. Portanto o next irá disponibilizar formas de pré-renderização para que se possa disponibilizar a página pré-renderizada com o conteúdo do back-end
 *  No nextjs há duas formas de pré-renderização
 *  1. estática
 *  2. server-side rendering
 *  Nesta aula aprenderemos static
 *  No static generation, as páginas são renderizadas na contruição do app para produção, e dopis não muda.
 *  Para carregar os dados do back-end antes da pré-renderização, faça os request dentro da função exportada assíncrona chamada getStaticProps. esta função funciona como o loader no react.
 *  O códgigo dentro da função getStaticProps será executado no server e então deve retornar um obj que poderá ter props, que será o props que o component irá receber
 */
/**
 * aula 473: more on SSG
 *  Aqui vi que dá sim para atualizar as páginas estáticamente pre-renderizadas.
 *  Fazemos isso definindo revalidate no obj de retorno do getStaticProps, e definimos a quantidade de segundos em que o site deverá atualizar as informações.
 *  E a cada xsegundos as informações serão refeitas e confeiridas se tem mudanças para por na tela.
 */
/**
 *aula 474: SSR
    Para a pr-erenderização serrver-side render, as páginas serão re-renderizadas a cada request/response.
    Para isso, use a função exportada e assíncrona chamada getServerSideProps() que será executada no servidor.
    Esta função recebe como parâmetro context, de onde se pode tirar parametros da url e tb os request e responses.
    Ela deve retornar um onj com o s props.

    Quando usar SSr vs SSG
        Se não precisa de acesso ao props o melhor é o SSG. Pois nesse caso os dados não mudam constantemente e não precisa de login, logo é melhor, neste caso, o SSG.
        Caso precise de login, autenticação, ou dados que mudam constantemente, então é recomendado usar SSR.
        SSG será mais rápido que SSR pois os dados já são processados e salvos na cache, o que otimiza o app.
 */
/**
 * aula 482: Head metadata
 *  Pra adicionar metadara nas páginas do app Nextjs, devemos adicionar a tag Head da biblioteca do Next e por os metadados dentro deles como se fosse em um html
 *  Lembrando que podemos definir diferentes Heads para diferentes páginas, e o head não se aplica as páginas filhas.
 */
function HomePage(props) {
  /**
   * const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    //send request and fetch data

    setLoadedMeetups(DUMMY_MEETUPS);
  }, []);
   */

  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of active  React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const request = context.req;
//   const response = context.res;

//   return {
//     props: { meetups: DUMMY_MEETUPS },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://augusto-hs-95:k70b0Gyfkinh3TNb@cluster0.hw6iajq.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();

  const meetupsCllection = db.collection("meetups");

  const meetups = await meetupsCllection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
