import Input from '../input';
import Button from '../button';
import SectionHeader from '../section-header';

import styles from './style.module.css';

const ElementForm = () => {
  return (
    <div>
      <div className={styles.headerContainer}>
        <SectionHeader>Criar Elemento</SectionHeader>
        <Button type='delete' icon='MdDelete'>
          Excluir elemento
        </Button>
      </div>
      <Input label='Nome do conteúdo'></Input>
      <Input label='Descrição'></Input>
      <Input label='Link'></Input>
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
}

export default ElementForm;