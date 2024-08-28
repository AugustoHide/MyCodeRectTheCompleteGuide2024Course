import Badge from "./Badge.jsx";
import { motion } from "framer-motion";

/**
 * aula 506: animating shared elements
 *  O framer motion já tem uma forma de definir animação para midança de tab. A maneira de usá-lo é defininto o layoutId no ele que irá passar de uma tab para outra, ao selecinarmos uma diferente tab.
 */
/**
 * aula 507: re-trigger animations via keys
 *  Nesta aula definimos animação para o badge, que contem o número de ele da lista.Queremo que este elemento tenha ma animação simples para cada mudança de valores na lista.
 *  Para isso, primeiramente definimos o props animation,transition para fazer a definição da animação.
 *  Para que a animação seja ativada para cada mudança, devemos adicionar como key, a variável que irá mudar, assim o react irá rerenderizar o ele, e o framer motion irá refazer a animação
 */

function Tab({ isSelected, onSelect, badgeCaption, children }) {
  return (
    <li>
      <button
        className={isSelected ? "selected" : undefined}
        onClick={onSelect}
      >
        {children}
        <Badge key={badgeCaption} caption={badgeCaption}></Badge>
      </button>
      {isSelected && (
        <motion.div layoutId="tab-indicator" className="active-tab-indicator" />
      )}
    </li>
  );
}

export default function ChallengeTabs({
  selectedType,
  onSelectType,
  challenges,
  children,
}) {
  return (
    <>
      <menu id="tabs">
        <Tab
          isSelected={selectedType === "active"}
          onSelect={() => onSelectType("active")}
          badgeCaption={challenges.active.length}
        >
          Active
        </Tab>
        <Tab
          isSelected={selectedType === "completed"}
          onSelect={() => onSelectType("completed")}
          badgeCaption={challenges.completed.length}
        >
          Completed
        </Tab>
        <Tab
          isSelected={selectedType === "failed"}
          onSelect={() => onSelectType("failed")}
          badgeCaption={challenges.failed.length}
        >
          Failed
        </Tab>
      </menu>
      <div>{children}</div>
    </>
  );
}
