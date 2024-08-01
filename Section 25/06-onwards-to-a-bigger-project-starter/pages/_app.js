import "../styles/globals.css";

import Layout from "../components/layout/Layout";

/**
 *aula 468: _app.js & layout wrapper
  Para fazer um layout para todas as páginas sem precisar replicar manualmente, nextjs possibilita uso de _app.js, que é arquivo que define layout de todas as páginas automaticamente.
  Logo, pode-se definir layout padrão para todas as páginas ali.
  O _app.js é como se fosse um RootLayout.js
  Ele tem dois paramentros:
    Component: componente que será executado
    props: props que componente receberá
 */

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
