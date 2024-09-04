import Accordion from "./components/Accordion/Accordion";
import Searchablelist from "./components/SearchableList/SearchableList";
import Place from "../Place";

import savannaImg from "./assets/african-savanna.jpg";
import amazonImg from "./assets/amazon-river.jpg";
import caribbeanImg from "./assets/caribbean-beach.jpg";
import desertImg from "./assets/desert-dunes.jpg";
import forestImg from "./assets/forest-waterfall.jpg";
const PLACES = [
  {
    id: "african-savanna",
    image: savannaImg,
    title: "African Savanna",
    description: "Experience the beauty of nature.",
  },
  {
    id: "amazon-river",
    image: amazonImg,
    title: "Amazon River",
    description: "Get to know the largest river in the world.",
  },
  {
    id: "caribbean-beach",
    image: caribbeanImg,
    title: "Caribbean Beach",
    description: "Enjoy the sun and the beach.",
  },
  {
    id: "desert-dunes",
    image: desertImg,
    title: "Desert Dunes",
    description: "Discover the desert life.",
  },
  {
    id: "forest-waterfall",
    image: forestImg,
    title: "Forest Waterfall",
    description: "Listen to the sound of the water.",
  },
];
/**
 * aula 513: Grouping compound components
 *  Nesta aula defninmos os elementos compound, sendo o elemento mais 'interno' como uma propriedade do objeto da função do obj to ele compound pai/externo.
 *  Fazemos isso para que, através dos limites impostos pelo useContext, que é necessário para transmitir dados inríssecos es estes dois componentes, limitamos o uso do componente mais interno, neste caso AccordianItem, somente dentro do componente compound mais externo.
 *  Assim, fazemos a ligação de dependencia, que é da definição de elementos compound onde um componente não pode ser usado sozinho, mas somente em conjunto com o outro.
 */
/**
 * aula 514:Adding extra components for reusability and configuration
 *  Nesta aula 'desmembramos' o AccordionItem em AccordionTitle e AccordionContent. Dazemos isso para aplicar o princípio dado no início de Compound Components. Assim teremos melho reutilização do partes do código e componentes.
 *  Para agrupar melhor os componentes, utilizamos os componentes pondo eles dentro do obj da função do componente mais externo, neste caso o Accordion. Assim, teremos aplicado o compound componet, e os componentes internos não poderão ser utilizados fora do Accordion por causa da limitação definida pelo uso do useContext.
 *  Além disso, para termos mais flexibilidade na utilização dos componentes, definimos o máximo de caracteríscas como prop. Passamos, o children, className e id. Fazendo dos componentes o maís flexível possível.
 */
/**
 * aula 515
 *  Nesta aula, crie mais um context para uso dos componetes do AccordionItem. Fiz isso para ficar mai fácil de passa props no App.js
 */
/**
 * aula 518: render props
 *  Aqui implementamos na prática o render props. Pois, para renderizar objetos de forma 'bonita' precisamos construir o componente Place. Porém, como no segundo uso, oi somente um array, não precisamos usar este componente Places.
 *  Então, para configurar essa diferença, passamos uma função diferente para cada SeachableItem, onde uma, usaremos o Place, e na outra simplesmete apresentaremos o item do array.
 *  Sendo render props útil para personalização.
 */
function App() {
  return (
    <main>
      <section>
        <h2>Why work with us?</h2>
        <Accordion className="accordion">
          <Accordion.Item id="experience" className="accordion-item">
            <Accordion.Title className="accordion-item-title">
              We got 2 years of expireince!
            </Accordion.Title>
            <Accordion.Content className="accordion-item-content">
              <article>
                <p>You can not go wrong with us!</p>
                <p>
                  We are in the business of planning individual trips vacations
                  for more than 1 year.
                </p>
              </article>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item id="local-guides" className="accordion-item">
            <Accordion.Title className={"accordion-item-title"}>
              We are working eith local guides!
            </Accordion.Title>
            <Accordion.Content className="accordion-item-content">
              <article>
                <p>We are not doing this alone from our offices!</p>
                <p>Istead we are looking for better experience in the life.</p>
              </article>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </section>
      <section>
        <Searchablelist itemKeyFn={(item) => item.id} items={PLACES}>
          {(item) => <Place item={item} />}
        </Searchablelist>
        <Searchablelist itemKeyFn={(item) => item} items={["items", "items 2"]}>
          {(item) => item}
        </Searchablelist>
      </section>
    </main>
  );
}

export default App;
