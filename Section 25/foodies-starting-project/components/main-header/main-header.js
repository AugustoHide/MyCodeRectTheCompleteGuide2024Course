import Link from "next/link";
import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import Image from "next/image";
import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-link";

/**
 * aula 422: CSS Modules
 *  Aqui usamos CSS modules. Para isso o intrutor do curso criou um arquivo com as estilizações em css no módulo CSS modules.
 *  Para isso ele terminou o arquivo de css com module.css, o que faz o Nextjs enterder que essa estilização de css deve ser aplica somente aos componentes que importarem ele. E não afetará os outros componentes.
 *  Para usar as clases definidas no css, basta importar com um nome e utilizar esse nome.classeA SerAplicada
 */
/**
 * aula 423: Images optimization with Nextjs
 *  Aqui substituímos img do htmll para Image da biblioteca do Next.
 *  Isso porque, Image do Nextjs otimiza o carregamento. Muitas vezes colocando o formato do arquivo na forma mais eficiente possível. Facilitando otimizações quando for passar o projeto para o modo de produção.
 *  Ele automaticamente bota a imagem para o modo lazy loading para melhorar o desempenho do app.
 * Além disso tem configurações de estilizações normais, como width, eytc..
 *
 */
export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="A plate with tasty food!" priority />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Brose meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
