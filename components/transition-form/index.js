import Input from '../input';
import Button from '../button';
import Dropdown from '../dropdown';
import SectionHeader from '../section-header';

import styles from './style.module.css';
const TransitionForm = () => {
  return (
    <div>
      <div className={styles.headerContainer}>
        <SectionHeader>Criar Transição</SectionHeader>
        <Button type='delete' icon='MdDelete'>
          Excluir elemento
        </Button>
      </div>
      <Dropdown label='Selecione o elemento de origem' placeholder='Buscar...'></Dropdown>
      <Dropdown label='Selecione os elementos seguintes' placeholder='Buscar...'></Dropdown>
      <Dropdown label='Pré-requisitos' placeholder='Buscar...'></Dropdown>
      <Input label='Foco'></Input>
      <div className={styles.btnContainer}>
        <Button type='secondary' size='big'>
          Cancelar
        </Button>
        <Button type='primary' size='big'>
          Confirmar
        </Button>
      </div>
    </div>
  );
};

export default TransitionForm;
