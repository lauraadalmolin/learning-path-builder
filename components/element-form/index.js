import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Input from '../input';
import Button from '../button';
import SectionHeader from '../section-header';

import styles from './style.module.css';

const DEFAULT_STATE = {
  title: { value: '', isValid: false },
  description: { value: '', isValid: false },
  focus: { value: '', isValid: false },
  link: { value: '', isValid: true },
  id: { value: null, isValid: true }
};

const TOAST_CONFIG = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 6000
}

const ElementForm = ({ saveHandler, cancelHandler, deleteHandler, formData }) => {
  const [inputs, setInputs] = useState(DEFAULT_STATE);

  useEffect(() => {
    if (!formData) {
      resetForm();
      return;
    }

    const newState = Object.assign({}, DEFAULT_STATE);
    for (const [key, _] of Object.entries(newState)) {
      newState[key] = { value: formData.data[key] ?? '', isValid: true }
    }

    setInputs(newState);
  }, [formData]);

  const isRequired = (inputValue) => {
    return inputValue.length > 0;
  };

  const isNotRequired = (_) => {
    return true;
  }

  const validationFunctionsMap = new Map([
    ['title', isRequired],
    ['description', isRequired],
    ['link', isNotRequired],
    ['focus', isRequired],
  ]);

  const inputChangedHandler = (inputIdentifier, event) => {
    const enteredValue = event.target.value;
    const validationFn = validationFunctionsMap.get(inputIdentifier);
    const validationState = validationFn(enteredValue);
    setInputs((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: validationState },
      };
    });
  };

  const isFormValid = () => {
    const titleValid = isRequired(inputs.title.value);
    const descriptionValid = isRequired(inputs.description.value);
    const focusValid = isRequired(inputs.focus.value);

    if (!titleValid || !focusValid || !descriptionValid) {
      setInputs((curInputs) => {
        return {
          title: { value: curInputs.title.value, isValid: titleValid },
          description: { value: curInputs.description.value, isValid: descriptionValid },
          focus: {
            value: curInputs.focus.value,
            isValid: focusValid,
          },
          link: { value: curInputs.link.value, isValid: true },
          id: { value: curInputs.id.value, isValid: true }
        };
      });

      return false;
    }

    return true;
  };

  const resetForm = () => {
    setInputs(DEFAULT_STATE);
  }

  const submitForm = async () => {
    if (!isFormValid()) {
      toast.error("Os campos marcados com * são obrigatórios", TOAST_CONFIG)
      return;
    }

    const formData = {
      title: inputs.title.value,
      description: inputs.description.value,
      focus: inputs.focus.value,
      link: inputs.link.value,
      id: inputs.id.value
    };

    try {
      saveHandler(formData);
      if (!formData.id) resetForm();
    } catch (error) {
      toast.error(`${strings.genericError} Erro: ${error}`, TOAST_CONFIG);
    }
  };

  return (
    <div>
      <div className={styles.headerContainer}>
        <SectionHeader>Criar Elemento</SectionHeader>
        { inputs.id.value !== null && <Button onClickHandler={() => deleteHandler(inputs.id.value)} type='delete' icon='MdDelete'>
          Excluir elemento
        </Button> }
      </div>
      <Input label='Nome do conteúdo' inputConfig={{
        placeholder: 'Algoritmos e estruturas de dados',
        value: inputs.title.value,
        onChange: inputChangedHandler.bind(this, 'title'),
      }}></Input>
      <Input label='Descrição' inputConfig={{
        placeholder: 'Disciplina do primeiro ano de ECOMP',
        value: inputs.description.value,
        onChange: inputChangedHandler.bind(this, 'description'),
      }}></Input>
      <Input label='Foco' inputConfig={{
        placeholder: 'Insira a intensidade de foco necessária',
        value: inputs.focus.value,
        onChange: inputChangedHandler.bind(this, 'focus'),
        type: 'number'
      }}></Input>
      <Input label='Link' inputConfig={{
        placeholder: 'Informe um link com mais informações (opcional)',
        value: inputs.link.value,
        onChange: inputChangedHandler.bind(this, 'link')
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
}

export default ElementForm;