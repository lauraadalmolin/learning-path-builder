import Button from '../button';
import ElementForm from '../element-form';
import SectionHeader from '../section-header';
import TransitionForm from '../transition-form';

import FORM_TYPE from '../../constants/form-type.json';

import styles from './style.module.css';
import { useEffect, useState } from 'react';

const SideSection = ({ formType, showForm, selectedObj, lPathData, elementSubmitHandler, elementCancelHandler, transitionSubmitHandler, transitionCancelHandler }) => {

  const [formData, setFormData] = useState();

  useEffect(() => {
    if (!selectedObj) {
      setFormData(null);
      return;
    } 

    const typeMap = new Map([
      [FORM_TYPE.Element, 'nodes'],
      [FORM_TYPE.Transition, 'edges'],
    ]);

    lPathData['graph'][typeMap.get(formType)]
      .forEach(element => {
        if (element.data.id === selectedObj) {
          console.log(element, '--')
          setFormData(element);
        }
      });
  }, [selectedObj]);

  const getBtnClass = (type) => {
    if (formType === type) return 'primary';
    return 'secondary';
  }

  return (
    <div className={styles.columnContainer}>
      <div className={styles.section}>
        <SectionHeader>Ferramentas</SectionHeader>
        <div className={`${styles.rowContainer} ${styles.headerSpacer}`}>
          <Button icon='MdAdd' type={getBtnClass(FORM_TYPE.Element)} onClickHandler={() => { showForm(FORM_TYPE.Element); setFormData(null); }}>
            Conteúdo
          </Button>
          <Button icon='MdOutlineCompareArrows' type={getBtnClass(FORM_TYPE.Transition)} onClickHandler={() => { showForm(FORM_TYPE.Transition); setFormData(null); }}>
            Transição
          </Button>
        </div>
      </div>
      <div className={styles.spacer}></div>
      <div className={styles.section}>
        {formType === FORM_TYPE.Element && <ElementForm saveHandler={elementSubmitHandler} cancelHandler={elementCancelHandler} formData={formData}/> }
        {formType === FORM_TYPE.Transition && <TransitionForm saveHandler={transitionSubmitHandler} cancelHandler={transitionCancelHandler} formData={formData} lPathData={lPathData}/> }
      </div>
    </div>
  );
}

export default SideSection;