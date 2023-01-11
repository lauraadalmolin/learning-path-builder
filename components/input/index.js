import styles from './style.module.css';
import * as MaterialIcons from 'react-icons/md';

const Input = ({ label }) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{ label }</span>
      <input className={styles.input}></input>
    </div>
  );
};

export default Input;
