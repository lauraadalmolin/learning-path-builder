import { MdClose } from 'react-icons/md';

import Button from '../button';

import useOutsideClick from '../../hooks/use-outside-click';

import styles from './style.module.css';

const ModalWindow = ({ title, description, confirmHandler, cancelHandler }) => {
  const ref = useOutsideClick(cancelHandler);
  
  return (
    <div className={styles.container}>
      <div ref={ref} className={styles.modal}>
        <MdClose className={styles.closeBtn} onClick={cancelHandler} />
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.btnContainer}>
          <Button size='big' onClickHandler={cancelHandler} type='secondary'>
            Cancelar
          </Button>
          <Button size='big' onClickHandler={confirmHandler} type='primary'>
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
