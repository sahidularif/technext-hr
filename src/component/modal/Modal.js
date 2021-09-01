import React, { useEffect, useRef } from "react";
import CloseIcon from "../CloseIcon";
import styles from "./modal.module.css";
import { FaWindowClose } from 'react-icons/fa';

const Modal = ({ modalStyle, children, show, onClose, backdropStyle }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    if (show) {
      modalRef.current.classList.add(styles.visible);
    } else {
      modalRef.current.classList.remove(styles.visible);
    }
  }, [show]);
  return (
    <React.Fragment>
      <div ref={modalRef} style={backdropStyle} className={`${styles.modal}`}>
       
        <div style={modalStyle} className={styles.modal__wrap}>
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
