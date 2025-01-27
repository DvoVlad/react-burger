import styles from "./modal-overlay.module.css"
import { FC } from 'react';

interface ModalOverlayProps {
  onClick: () => void
}

const ModalOverlay: FC<ModalOverlayProps> = ({ onClick }) => {
  return (
    <div className={styles.overlay} onClick={onClick}>
    </div>
  );
}

export default ModalOverlay;