import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

import Button from '../button';
import Dropdown from '../dropdown';
import Input from '../input';
import SectionHeader from '../section-header';

import strings from '../../constants/strings.json';
import styles from './style.module.css';

const DEFAULT_STATE = {
  originElement: { options: [], selectedValues: [], isValid: false },
  destinationElements: { options: [], selectedValues: [], isValid: false },
  preRequisites: { options: [],  selectedValues: [], isValid: true },
  focus: { value: '', isValid: false },
  id: { value: null, isValid: true }
};

const TOAST_CONFIG = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 6000
}

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
    if (!elements) return [];
    return elements.filter(element => element.data.parent)
      .map(element => {
        return { name: element.data.title, id: element.data.id, parent: element.data.parent }
      });
  } 

  const inputChangedHandler = (inputIdentifier, event) => {
    const enteredValue = event.target.value;
    const validationState = validateFocus(enteredValue);
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
    return foundElement.length === 0 && destinationElements.length > 0;
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

  const validateFocus = (focus) => {
    if (parseInt(focus) > parseInt(lPathData.focus)) {
      toast.error(`O valor do foco precisa ser menor ou igual ao foco total do estudante (foco = ${lPathData.focus})`, TOAST_CONFIG)
      return false;
    }

    if (parseInt(focus) <= 0) {
      toast.error(`O valor do foco precisa ser maior que zero`, TOAST_CONFIG)
      return false;
    }

    if (focus.length <= 0) {
      toast.error(`O campo foco é obrigatório`, TOAST_CONFIG)
      return false;
    }

    return true;
  }

  const isFormValid = () => {
    const originElement = inputs.originElement.selectedValues;
    const destinationElements = inputs.destinationElements.selectedValues;
    const preRequisites = inputs.preRequisites.selectedValues;

    const originElementValid = validateOriginElement(originElement);
    if (!originElementValid) {
      toast.error(strings.originElementValidationMessage, );
      return false;
    }

    const destinationElementsValid = validateDestinationElements(originElement, destinationElements);
    if (!destinationElementsValid) {
      toast.error(strings.destinationElementsValidationMessage, TOAST_CONFIG);
      return false;
    }
    
    const preRequisitesValid = validatePreRequisites(originElement, destinationElements, preRequisites);
    if (!preRequisitesValid) {
      toast.error(strings.preRequisitesValidationMessage, TOAST_CONFIG);
      return false;
    }
    
    const focusValid = validateFocus(inputs.focus.value);
    if (!focusValid) {
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
      toast.error(`${strings.genericError} Erro: ${error}`, TOAST_CONFIG);
    }
  }

  return (
    <div>
      <div className={styles.headerContainer}>
        <SectionHeader>{inputs.id.value !== null ? "Editar" : "Criar"} Transição</SectionHeader>
        {inputs.id.value !== null && <Button onClickHandler={() => deleteHandler(inputs.id.value)} type='delete' icon='MdDelete'>Excluir Transição</Button> } 
      </div>
      <Dropdown singleSelect={true} state={inputs.originElement} label='Selecione o conteúdo de origem' placeholder='Buscar...'></Dropdown>
      <Dropdown singleSelect={inputs.id.value !== null} state={inputs.destinationElements} label={inputs.id.value !== null ? 'Selecione o conteúdo de destino' : 'Selecione os conteúdos seguintes'} placeholder='Buscar...'></Dropdown>
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
