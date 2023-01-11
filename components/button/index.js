import * as MaterialIcons from 'react-icons/md';

import styles from './style.module.css';

const Button = ({ children, type='helper', icon }) => {
  return (
    <button className={`${styles.container} ${styles.btn} ${styles[type]}`}>
      <span className={`${styles.container} ${styles.icon}`}> {icon && MaterialIcons[icon]()} </span>
      <span className={styles.container}> {children} </span>
    </button>
  );
}

export default Button;