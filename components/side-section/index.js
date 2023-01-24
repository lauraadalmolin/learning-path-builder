import Button from '../button';
import ElementForm from '../element-form';
import SectionHeader from '../section-header';
import styles from './style.module.css';

const SideSection = () => {
  return (
    <div className={styles.columnContainer}>
      <div className={styles.section}>
        <SectionHeader>Ferramentas</SectionHeader>
        <div className={`${styles.rowContainer} ${styles.headerSpacer}`}>
          <Button icon='MdAdd' type='primary'>
            Conteúdo
          </Button>
          <Button icon='MdOutlineCompareArrows' type='secondary'>
            Transição
          </Button>
        </div>
      </div>
      <div className={styles.spacer}></div>
      <div className={styles.section}>
        <ElementForm/>  
      </div>
    </div>
  );
}

export default SideSection;