import * as MaterialIcons from 'react-icons/md';

import styles from './style.module.css';

const Button = ({ children, type='helper', size='small', icon, onClickHandler }) => {
  return (
    <button onClick={onClickHandler} className={`${styles.container} ${styles[size]} ${styles.btn} ${styles[type]}`}>
      <span className={`${styles.container} ${styles.icon}`}> {icon && MaterialIcons[icon]()} </span>
      <span className={styles.container}> {children} </span>
    </button>
  );
}

export default Button;