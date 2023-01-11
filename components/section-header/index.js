import styles from './style.module.css';

const SectionHeader = ({ children }) => {
  return <h1 className={styles.sectionHeader}>{ children }</h1>;
}

export default SectionHeader;