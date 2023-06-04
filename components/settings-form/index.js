import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Input from '../input';
import Button from '../button';
import SectionHeader from '../section-header';

import styles from './style.module.css';

const DEFAULT_STATE = {
  name: { value: '', isValid: false },
  focus: { value: '', isValid: false },
};

const TOAST_CONFIG = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 6000
}

const SettingsForm = ({ saveHandler, lPathData }) => {
  const [inputs, setInputs] = useState(DEFAULT_STATE);

  useEffect(() => {
    if (!lPathData) {
      resetForm();
      return;
    }

    const newState = Object.assign({}, DEFAULT_STATE);
    for (const [key, _] of Object.entries(newState)) {
      newState[key] = { value: lPathData[key] ?? '', isValid: true }
    }

    setInputs(newState);
  }, [lPathData]);

  const isRequired = (inputValue) => {
    return inputValue.length > 0;
  };

  const validationFunctionsMap = new Map([
    ['name', isRequired],
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
    const focusValid = isRequired(inputs.focus.value);

    if (!nameValid || !focusValid) {
      setInputs((curInputs) => {
        return {
          name: { value: curInputs.name.value, isValid: nameValid },
          focus: {
            value: curInputs.focus.value,
            isValid: focusValid,
          },
        };
      });

      return false;
    }

    return true;
  };

  const resetForm = () => {
    const SAVED_STATE = {
      name: { value: lPathData.name, isValid: true },
      focus: { value: lPathData.focus, isValid: true }
    }
    setInputs(SAVED_STATE);
  }

  const submitForm = async () => {
    if (!isFormValid()) {
      toast.error("Por favor, preencha todos os campos", TOAST_CONFIG)
      return;
    }

    const lPathData = {
      name: inputs.name.value,
      focus: inputs.focus.value,
    };

    try {
      saveHandler(lPathData);
      if (!lPathData.id) resetForm();
    } catch (error) {
      toast.error(`${strings.genericError} Erro: ${error}`, TOAST_CONFIG);
    }
  };

  const cancelHandler = () => {
    resetForm();
  }

  return (
    <div>
      <div className={styles.headerContainer}>
        <SectionHeader>Editar informações da rota</SectionHeader>
      </div>
      <Input label='Nome da rota' inputConfig={{
        placeholder: 'Ex: Matemática da 8a série',
        value: inputs.name.value,
        onChange: inputChangedHandler.bind(this, 'name'),
      }}></Input>
      <Input label='Foco simultâneo máximo do aluno' inputConfig={{
        placeholder: 'Informe um número que define o foco simultâneo máximo nessa rota',
        value: inputs.focus.value,
        onChange: inputChangedHandler.bind(this, 'focus'),
        type: 'number'
      }}></Input>
      <div className={styles.btnContainer}>
        <Button onClickHandler={cancelHandler} type='secondary' size='big'>
          Cancelar
        </Button>
        <Button onClickHandler={submitForm} type='primary' size='big'>
          Salvar
        </Button>
      </div>
    </div>
  );
}

export default SettingsForm;