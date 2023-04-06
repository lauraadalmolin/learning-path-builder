import { useState } from 'react';

import Input from '../input';
import Button from '../button';
import SectionHeader from '../section-header';

import styles from './style.module.css';

const DEFAULT_STATE = {
  name: { value: '', isValid: false },
  description: { value: '', isValid: false },
  focus: { value: '', isValid: false },
  link: { value: '', isValid: true },
  id: { value: null, isValid: true }
};

const ElementForm = ({ saveState }) => {
  const [inputs, setInputs] = useState(DEFAULT_STATE);

  const isRequired = (inputValue) => {
    return inputValue.length > 0;
  };

  const isNotRequired = (inputValue) => {
    return true;
  }

  const validationFunctionsMap = new Map([
    ['name', isRequired],
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
    const nameValid = isRequired(inputs.name.value);
    const descriptionValid = isRequired(inputs.description.value);
    const focusValid = isRequired(inputs.focus.value);

    if (!nameValid || !focusValid || !descriptionValid) {
      setInputs((curInputs) => {
        return {
          name: { value: curInputs.name.value, isValid: nameValid },
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
      name: inputs.name.value,
      description: inputs.description.value,
      focus: inputs.focus.value,
      link: inputs.link.value
    };

    try {
      console.log(formData);
      saveState(formData);
      // dispatch({ type: 'elementForm', formData });
      resetForm();
    } catch (error) {
      alert(
        error + ' ocorreu algum erro no cadastro, tente novamente mais tarde'
      );
    }
  };

  return (
    <div>
      <div className={styles.headerContainer}>
        <SectionHeader>Criar Elemento</SectionHeader>
        { inputs.id.value !== null && <Button type='delete' icon='MdDelete'>
          Excluir elemento
        </Button> }
      </div>
      <Input label='Nome do conteúdo' inputConfig={{
        placeholder: 'Algoritmos e estruturas de dados',
        value: inputs.name.value,
        onChange: inputChangedHandler.bind(this, 'name'),
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
        <Button type='secondary' size='big'>
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