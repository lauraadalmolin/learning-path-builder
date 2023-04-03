import { useState } from 'react';
import Button from '../button';
import ElementForm from '../element-form';
import SectionHeader from '../section-header';
import TransitionForm from '../transition-form';
import styles from './style.module.css';

const FORM_TYPE = {
  Transition: 'TRANSITION',
  Element: 'ELEMENT'
}

const SideSection = () => {
  const [formType, setFormType] = useState(FORM_TYPE.Element);

  const showForm = (type) => {
    console.log(type)
    setFormType(type);
  }

  const getBtnClass = (type) => {
    if (formType === type) return 'primary';
    return 'secondary';
  }

  return (
    <div className={styles.columnContainer}>
      <div className={styles.section}>
        <SectionHeader>Ferramentas</SectionHeader>
        <div className={`${styles.rowContainer} ${styles.headerSpacer}`}>
          <Button icon='MdAdd' type={getBtnClass(FORM_TYPE.Element)} onClickHandler={() => showForm(FORM_TYPE.Element)}>
            Conteúdo
          </Button>
          <Button icon='MdOutlineCompareArrows' type={getBtnClass(FORM_TYPE.Transition)} onClickHandler={() => showForm(FORM_TYPE.Transition)}>
            Transição
          </Button>
        </div>
      </div>
      <div className={styles.spacer}></div>
      <div className={styles.section}>
        { formType === FORM_TYPE.Element && <ElementForm/> }
        { formType === FORM_TYPE.Transition && <TransitionForm/> }
      </div>
    </div>
  );
}

export default SideSection;