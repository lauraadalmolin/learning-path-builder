import * as MaterialIcons from 'react-icons/md';

import styles from './style.module.css';

const IconButton = ({ type='primary', icon, onClickHandler }) => {
  return (
    <button onClick={onClickHandler} className={`${styles.btn} ${styles[type]}`}>
      <span className={`${styles.container} ${styles.icon}`}>
        {icon && MaterialIcons[icon]()}{' '}
      </span>
    </button>
  );
};

export default IconButton;
