import Head from 'next/head';

import Button from '../components/button'
import IconButton from '../components/icon-button';
import Input from '../components/input';
import SideSection from '../components/action-area';

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
      </Head>
      <div className={styles.externalContainer}>
        <div className={styles.columnContainer}>
          <div className={styles.rowContainer}>
            <Button icon='MdAdd' type='helper'>
              Elemento
            </Button>
            <Button icon='MdCheck' type='primary'>
              Validar
            </Button>
            <Button type='secondary'>Cancelar</Button>
            <Button icon='MdDelete' type='delete'>
              Excluir
            </Button>
          </div>
          <div className={styles.rowContainer}>
            <Input label='Nome do conteúdo' />
          </div>
          <div className={styles.rowContainer}>
            <IconButton icon='MdDelete' type='delete'/>
            <IconButton icon='MdDownload' type='primary'/>
          </div>
        </div>
        <div className={styles.columnContainer}>
          <SideSection/>
        </div>
      </div>
    </>
  );
}
