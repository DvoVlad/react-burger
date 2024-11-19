import { useEffect } from "react";
import styles from "./modal.module.css"
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { createPortal } from 'react-dom';
import ModalOverlay from "./modal-overlay/modal-overlay";
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals"); 

function Modal({children, onClose, title}) {
  const onEscClose = e => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onEscClose);

    return () => {
      document.removeEventListener('keydown', onEscClose);
    }
  });

  return(
    createPortal(
      <>
        <ModalOverlay onClick={onClose}/>
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={onClose} type="button"><CloseIcon type="primary" /></button>
          {title && <p className={styles.mainTitle + " text text_type_main-large mt-10 pl-10 pr-10"}>{title}</p>}
          {children}
        </div>
      </>,
      modalRoot
    )
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string
}

export default Modal;