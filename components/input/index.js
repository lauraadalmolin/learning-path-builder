import styles from './style.module.css';

const Input = ({ label, placeholder='Arrays e Strings' }) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{ label }</span>
      <input className={styles.input} placeholder={placeholder}></input>
    </div>
  );
};

export default Input;
