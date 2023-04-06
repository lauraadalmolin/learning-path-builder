import { useState } from 'react';
import Button from '../button';
import ElementForm from '../element-form';
import SectionHeader from '../section-header';
import TransitionForm from '../transition-form';

import FORM_TYPE from '../../constants/form_type.json';

import styles from './style.module.css';

const SideSection = ({ formType, showForm, elementHandler }) => {

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
        { formType === FORM_TYPE.Element && <ElementForm saveState={elementHandler}/> }
        { formType === FORM_TYPE.Transition && <TransitionForm/> }
      </div>
    </div>
  );
}

export default SideSection;