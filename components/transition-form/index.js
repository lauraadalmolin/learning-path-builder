import Input from '../input';
import Button from '../button';
import Dropdown from '../dropdown';
import SectionHeader from '../section-header';

import styles from './style.module.css';
import { useEffect, useState } from 'react';

const DEFAULT_STATE = {
  originElement: { options: [], selectedValues: [], isValid: false },
  destinationElements: { options: [], selectedValues: [], isValid: false },
  preRequisites: { options: [],  selectedValues: [], isValid: true },
  focus: { value: '', isValid: false },
  id: { value: null, isValid: true }
};

// origin element can be only 1
// origin can't be on following as well
// focus is required
// pre-requisites are not required but can't have origin or destinationElements

const TransitionForm = ({ saveHandler, cancelHandler, deleteHandler, formData, lPathData }) => {
  
  const [inputs, setInputs] = useState(DEFAULT_STATE);

  useEffect(() => {
    if (!lPathData || formData) return;
    resetForm();
  }, [lPathData]);

  useEffect(() => {
    if (!formData || inputs.originElement.options.length === 0) {
      resetForm();
      return;
    }

    const newState = Object.assign({}, inputs);
    newState.focus = { ...newState.focus, value: formData.data.focus ?? '', isValid: true };
    newState.id = { ...newState.id, value: formData.data.id, isValid: true };
    newState.originElement = { ...newState.originElement, selectedValues: getSelectedValuesArr([formData.data.source]), isValid: true }
    newState.destinationElements = { ...newState.destinationElements, selectedValues: getSelectedValuesArr([formData.data.target]), isValid: true }
    newState.preRequisites = { ...newState.preRequisites, selectedValues: getSelectedValuesArr(formData.data.preRequisites), isValid: true }

    setInputs(newState);
  }, [formData])

  const getSelectedValuesArr = (ids) => {
    const idsSet = new Set(ids);
    return inputs.originElement.options.filter(option => {
      if (idsSet.has(option.parent)) return option;
    })
  }

  const formatElements = (elements) => {
    return elements.filter(element => element.data.parent)
      .map(element => {
        return { name: element.data.title, id: element.data.id, parent: element.data.parent }
      });
  } 

  const inputChangedHandler = (inputIdentifier, event) => {
    const enteredValue = event.target.value;
    const validationState = isRequired(enteredValue);
    setInputs((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: validationState },
      };
    });
  };

  const resetForm = () => {
    const elements = formatElements(lPathData.graph.nodes);
    setInputs((curInputValues) => {
      return {
        ...curInputValues,
        originElement: { options: elements, selectedValues: [], isValid: false },
        destinationElements: { options: elements, selectedValues: [], isValid: false },
        preRequisites: { options: elements, selectedValues: new Array(), isValid: true },
        focus: { value: '', isValid: false },
        id: { value: null, isValid: true }
      };
    });
  }

  const validateOriginElement = (originElementArr) => {
    return originElementArr.length === 1;
  }

  const validateDestinationElements = (originElementArr, destinationElements) => {
    const originElement = originElementArr[0];
    const foundElement = destinationElements.filter(element => {
      if (element.id === originElement.id) {
        return element;
      }
    });
    return foundElement.length === 0;
  }

  const validatePreRequisites = (originElementArr, destinationElements, preRequisites) => {
    const usedElements = new Set();
    usedElements.add(originElementArr[0].id);

    for (const element of destinationElements) {
      usedElements.add(element.id);
    }

    const foundElement = preRequisites.filter(element => {
      if (usedElements.has(element.id)) {
        return element;
      }
    });

    return foundElement.length === 0;
  }

  const isRequired = (inputValue) => {
    return inputValue.length > 0;
  };

  const isFormValid = () => {
    const originElement = inputs.originElement.selectedValues;
    const destinationElements = inputs.destinationElements.selectedValues;
    const preRequisites = inputs.preRequisites.selectedValues;

    const originElementValid = validateOriginElement(originElement);
    if (!originElementValid) {
      console.log('erro no origin element');
      return false;
    }

    const destinationElementsValid = validateDestinationElements(originElement, destinationElements);
    if (!destinationElementsValid) {
      console.log('erro no destination elements');
      return false;
    }
    
    const preRequisitesValid = validatePreRequisites(originElement, destinationElements, preRequisites);
    if (!preRequisitesValid) {
      console.log('erro nos pre-requisites');
      return false;
    }
    
    const focusValid = isRequired(inputs.focus.value);
    if (!focusValid) {
      console.log('erro no focus');
      return false;
    }
    
    setInputs((curInputs) => {
      return {
        ...curInputs,
        originElement: { ...curInputs.originElement, isValid: originElementValid },
        destinationElements: { ...curInputs.destinationElements, isValid: destinationElementsValid },
        preRequisites: { ...curInputs.preRequisites, isValid: preRequisitesValid },
        focus: { ...curInputs.focus, isValid: focusValid },
      };
    });

    return true;
  };

  const submitForm = () => {
    if (!isFormValid()) {
      return;
    }

    const formData = {
      originElement: inputs.originElement.selectedValues[0],
      destinationElements: inputs.destinationElements.selectedValues,
      preRequisites: inputs.preRequisites.selectedValues,
      focus: inputs.focus.value,
      id: inputs.id.value
    };

    try {
      saveHandler(formData);
      if (!formData.id) resetForm();
    } catch (error) {
      alert(
        error + ' ocorreu algum erro no cadastro, tente novamente mais tarde'
      );
    }
  }

  return (
    <div>
      <div className={styles.headerContainer}>
        <SectionHeader>Criar Transição</SectionHeader>
        {inputs.id.value !== null && <Button onClickHandler={() => deleteHandler(inputs.id.value)} type='delete' icon='MdDelete'>Excluir Transição</Button> } 
      </div>
      <Dropdown singleSelect={true} state={inputs.originElement} label='Selecione o elemento de origem' placeholder='Buscar...'></Dropdown>
      <Dropdown singleSelect={inputs.id.value !== null} state={inputs.destinationElements} label={inputs.id.value !== null ? 'Selecione o elemento de destino' : 'Selecione os elementos seguintes'} placeholder='Buscar...'></Dropdown>
      <Dropdown state={inputs.preRequisites} label='Pré-requisitos' placeholder='Buscar...'></Dropdown>
      <Input label='Foco' inputConfig={{
        placeholder: 'Insira a intensidade de foco necessária',
        value: inputs.focus.value,
        onChange: inputChangedHandler.bind(this, 'focus'),
        type: 'number'
      }}></Input>
      <div className={styles.btnContainer}>
        <Button onClickHandler={cancelHandler} type='secondary' size='big'>
          Cancelar
        </Button>
        <Button onClickHandler={submitForm} type='primary' size='big'>
          Confirmar
        </Button>
      </div>
    </div>
  );
};

export default TransitionForm;
