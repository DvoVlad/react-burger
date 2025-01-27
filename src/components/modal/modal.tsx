import { useEffect, FC } from "react";
import type { PropsWithChildren } from "react";
import styles from "./modal.module.css"
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { createPortal } from 'react-dom';
import ModalOverlay from "./modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals")!; 

interface ModalProps {
  onClose: () => void;
  title?: string;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({children, onClose, title}) => {
  useEffect(() => {
    const onEscClose = (e: KeyboardEvent)=> {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener('keydown', onEscClose);

    return () => {
      document.removeEventListener('keydown', onEscClose);
    }
  }, [onClose]);

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

export default Modal;