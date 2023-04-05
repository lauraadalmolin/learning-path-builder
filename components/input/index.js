import styles from './style.module.css';

const Input = ({ label, inputConfig }) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{ label }</span>
      <input className={styles.input} {...inputConfig}></input>
    </div>
  );
};

export default Input;
