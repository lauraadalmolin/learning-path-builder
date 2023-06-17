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

const ElementForm = ({ saveHandler, cancelHandler, deleteHandler, formData, lPathData }) => {
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

  const isRequired = (inputValue, inputIdentifier) => {
    const names = new Map([
      ['title', 'nome do conteúdo'],
      ['description', 'descrição']
    ]);

    if (inputValue.length <= 0) {
      toast.error(`O campo ${names.get(inputIdentifier)} é obrigatório`, TOAST_CONFIG)
      return false;
    }

    return true;
  };

  const isNotRequired = (_) => {
    return true;
  }

  const validationFunctionsMap = new Map([
    ['title', isRequired],
    ['description', isRequired],
    ['focus', validateFocus],
    ['link', isNotRequired],
  ]);

  const inputChangedHandler = (inputIdentifier, event) => {
    const enteredValue = event.target.value;
    const validationFn = validationFunctionsMap.get(inputIdentifier);
    const validationState = validationFn(enteredValue, inputIdentifier);
    setInputs((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: validationState },
      };
    });
  };

  const isFormValid = () => {
    const titleValid = isRequired(inputs.title.value, 'title');
    const descriptionValid = isRequired(inputs.description.value, 'description');
    const focusValid = validateFocus(inputs.focus.value);

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
        <SectionHeader>{inputs.id.value !== null ? 'Editar' : 'Criar'} Conteúdo</SectionHeader>
        { inputs.id.value !== null && <Button onClickHandler={() => deleteHandler(inputs.id.value)} type='delete' icon='MdDelete'>
          Excluir Conteúdo
        </Button> }
      </div>
      <Input label='Nome do conteúdo' inputConfig={{
        placeholder: 'Ex: Algoritmos e estruturas de dados',
        value: inputs.title.value,
        onChange: inputChangedHandler.bind(this, 'title'),
      }}></Input>
      <Input label='Descrição' inputConfig={{
        placeholder: 'Ex: Disciplina do primeiro ano de ECOMP',
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