import { useState } from "react";
import { motion } from "framer-motion";

/**
 * aula 492> framer
 *  Aqui usamos Framer para fazer nimação. O framer é uma biblioteca que pode ser adicionado a projetos react para facilitar o uso de animações.
 *  Importante salientaar que o uso de Framer ajudar a otimizar animações para melhor desempenho. Sem necessidade de precisar ficar pensando em otimizações de animações ou se animações estão causando lentidão nos aplicativos. Sendo assim uma vantagem no uso.
 *  Para usar o framer é só instalar pelo npm, importar e usar  tarnsformando o elemento DOM que será  animado para motion.DOMElement.
 *  para configurar animações usamos o props animate e configuramos as coordenadas que irão mudar, entre outras propriedades para a animação.
 *  Feito isso precisamos usar o props transition com s propriedades de duraão da animaçẽo entre outras características como função de ativação.
 */

function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);

  return (
    <div id="demo">
      <motion.div
        id="box"
        animate={{ x, y, rotate }}
        transition={{
          duration: 1,
          // bounce: 0.5,
          type: "spring",
        }}
      />

      <div id="inputs">
        <p>
          <label htmlFor="x">X</label>
          <input
            type="number"
            id="x"
            onChange={(event) => setX(+event.target.value)}
          />
        </p>

        <p>
          <label htmlFor="y">Y</label>
          <input
            type="number"
            id="y"
            onChange={(event) => setY(+event.target.value)}
          />
        </p>

        <p>
          <label htmlFor="rotate">Rotate</label>
          <input
            type="number"
            id="rotate"
            onChange={(event) => setRotate(+event.target.value)}
          />
        </p>
      </div>
    </div>
  );
}

export default App;
