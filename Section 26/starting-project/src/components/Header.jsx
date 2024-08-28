import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import NewChallenge from "./NewChallenge.jsx";

/**
 * aula 496: para animar, no framer motion, a retirada de um elemento do dom, precisaremos de um componente do motion que assegurará que o elemento que for tirado do dom stenha suas animações de retirada feitas.
 * Isto pois, o react não permite a aplicaç~ao das animações do prop exit, pq ele simplesmente retira o elemento do dom.
 * Logo, é só encapsula o código que insere/retira o elemento em que usaremos a animação através do prop exit
 */
/**
 * aula: 497: usamos o whileHover para animar o elemto enquanto ele estiver no estado de hover. Assim não precisamos nos preocupar com o hoverStart e o hoverEnd. Facilitando o trabalho.
 */

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>
      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500 }}
          onClick={handleStartAddNewChallenge}
          className="button"
        >
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
