import { useRouter } from 'next/router';

import Button from '../../components/button';
import Navbar from '../../components/navbar';
import SectionHeader from '../../components/section-header';
import TableRow from '../../components/table-row';
import styles from './style.module.css';

const Home = () => {
  const router = useRouter();
  const arr = Array.from(Array(10).keys());

  const navigateHandler = (learningPathId) => {
    router.push({
      pathname: '/builder',
      query: { learningPathId }
    })
  }

  return (
    <div>
      <Navbar />
      <div className={styles.externalContainer}>
        <div className={styles.rowContainer}>
          <SectionHeader>Rotas de Aprendizagem</SectionHeader>
          <Button type='primary' icon='MdAdd' onClickHandler={() => navigateHandler('newRoute')}>
            Nova Rota
          </Button>
        </div>
        {arr.map((el) => (
          <TableRow
            key={el}
            learningPathName='Redes de Computadores'
            contentBadge='15 conteúdos'
            focusBadge='10 foco'
            navigate={() => navigateHandler(el)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
