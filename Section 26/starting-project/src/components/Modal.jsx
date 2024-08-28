import { createPortal } from "react-dom";
import { motion } from "framer-motion";

/**
 * aula 495: substituí a animação na abertura do modal de criação de challenges do css para o framer motion. Para isso, substituí dialog para motion.dialog e adicionei o prop initial, que define como será o dialogquando ele for adicionado ao dom. e depois adicionei o prop animate, que define o estado que altera o estado inicial. Logo animate define as configurações para quando o dialog sai do estado inicial. Ou seja quando ele abre.
 */
/**
 * aula 498: para reusar estados de animação, podemos usar o props variants e ne definir um objeto com as definições do estado de animação. Assim podemos usar estas definições como string ao definir animações. como abaixo.
 */

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        open
        className="modal"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}
