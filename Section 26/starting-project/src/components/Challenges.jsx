import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ChallengesContext } from "../store/challenges-context.jsx";
import ChallengeItem from "./ChallengeItem.jsx";
import ChallengeTabs from "./ChallengeTabs.jsx";

/**
 * aula504: multi ele animations
 *  Nesta aula aprendi como animar um conjunto de el. Para isso, definimos anterior mente no ChallengeItem o prop layout, que faz com que os elementos deslizem suavemente na tela quando houver retirada de el da tela.
 *  Depois definimos para cada elemento a animação definindo o prop exit.
 *  Para incluir o último elementos na animação do framer motion, devemos incluit a tag AnimatePresence para o código que define a retirada destes eleentos do dom. Pose ó aencapsularmos o elemento, o último não terá sua animação exit feita, pois ficará a cargo do react definir isso.
 *  Logo en seguida, definimos a animação da mensagem que aparece quando não tem el na lista. Isso pois ela aparece logo antes de o último elemento se retirado da tela, o que pode prejudicar o UX.
 *  Para isso definimos as props initial, animate, e exit, para que ele estaja invisível logo que aparecer.
 *  Além disso precisamos definir o prop mode=wait, para que a última mensagem de lista vazia só apareça uando a animação da lista terminar. Assim, não há sobreposições de informações na tela.
 */

export default function Challenges() {
  const { challenges } = useContext(ChallengesContext);
  const [selectedType, setSelectedType] = useState("active");
  const [expanded, setExpanded] = useState(null);

  function handleSelectType(newType) {
    setSelectedType(newType);
  }

  function handleViewDetails(id) {
    setExpanded((prevId) => {
      if (prevId === id) {
        return null;
      }

      return id;
    });
  }

  const filteredChallenges = {
    active: challenges.filter((challenge) => challenge.status === "active"),
    completed: challenges.filter(
      (challenge) => challenge.status === "completed"
    ),
    failed: challenges.filter((challenge) => challenge.status === "failed"),
  };

  const displayedChallenges = filteredChallenges[selectedType];

  return (
    <div id="challenges">
      <ChallengeTabs
        challenges={filteredChallenges}
        onSelectType={handleSelectType}
        selectedType={selectedType}
      >
        <AnimatePresence mode="wait">
          {displayedChallenges.length > 0 && (
            <motion.ol
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              key="list"
              exit={{ y: -30, opacity: 0 }}
              className="challenge-items"
            >
              {displayedChallenges.map((challenge) => (
                <ChallengeItem
                  key={challenge.id}
                  challenge={challenge}
                  onViewDetails={() => handleViewDetails(challenge.id)}
                  isExpanded={expanded === challenge.id}
                />
              ))}
            </motion.ol>
          )}
          {displayedChallenges.length === 0 && (
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, u: -20 }}
              key="fallback"
            >
              No challenges found.
            </motion.p>
          )}
        </AnimatePresence>
      </ChallengeTabs>
    </div>
  );
}
