import { useEffect } from "react";
import styles from "./modal.module.css"
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals"); 

function Modal({children, onClose}) {
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
        <div className={styles.overlay} onClick={onClose}>
        </div>
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={onClose} type="button"><CloseIcon type="primary" /></button>
          {children}
        </div>
      </>,
      modalRoot
    )
  );
}

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Modal;