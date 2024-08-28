import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ChallengesContext } from "../store/challenges-context.jsx";

/**
 * aula 494: aqui fiz a sustituição da animação previamente feita pelo css, para animação usando framer motion.
 *  Para isso apauei as proriedades de animação no index.css, e adicionei o motion aqui, transformando o span em motion.span. Assim pode-se adicionar a propriedade animate com o objeto descrevento a rotação que deve ser feita caso isExpanded mudade.
 */
/**
 * aula 505: animation with layout animations
 *  Aqui, aprendemos que o layout interfere de alguma forma no height do elemento que em que está presente. Dessa forma, se o height muda, o height meio que pega  bounce effect das animações, o que pode feixar estranho o comportamento na tela.
 *  Para concertar isso, definimos na div que vai aparecer caso clicamos para expandir a descrição, as props, initial, animate, e exit. Nelas definimos o height:0, inicialmente e height:'auto', que define o height padrão do elemento.
 *  E para que a animação do framer tb valesse para a saída do elemento do dom, definimos a AnimationPresence no código que define retirada/entrada do ele no dom.
 */

export default function ChallengeItem({
  challenge,
  onViewDetails,
  isExpanded,
}) {
  const { updateChallengeStatus } = useContext(ChallengesContext);

  const formattedDate = new Date(challenge.deadline).toLocaleDateString(
    "en-US",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  function handleCancel() {
    updateChallengeStatus(challenge.id, "failed");
  }

  function handleComplete() {
    updateChallengeStatus(challenge.id, "completed");
  }

  return (
    <motion.li layout exit={{ y: -30, opacity: 0 }}>
      <article className="challenge-item">
        <header>
          <img {...challenge.image} />
          <div className="challenge-item-meta">
            <h2>{challenge.title}</h2>
            <p>Complete until {formattedDate}</p>
            <p className="challenge-item-actions">
              <button onClick={handleCancel} className="btn-negative">
                Mark as failed
              </button>
              <button onClick={handleComplete}>Mark as completed</button>
            </p>
          </div>
        </header>
        <div className="challenge-item-details">
          <p>
            <button onClick={onViewDetails}>
              View Details{" "}
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                className="challenge-item-details-icon"
              >
                &#9650;
              </motion.span>
            </button>
          </p>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <p className="challenge-item-description">
                  {challenge.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </article>
    </motion.li>
  );
}
