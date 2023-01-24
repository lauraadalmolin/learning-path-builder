import { useRouter } from 'next/router';
import uuid from 'react-uuid';

import Button from '../../components/button';
import Navbar from '../../components/navbar';
import SectionHeader from '../../components/section-header';
import TableRow from '../../components/table-row';

import learningPathService from '../../service/learning-path.service';
import learningPathSchema from '../../constants/learning-path-schema.json' 
import styles from './style.module.css';
import { useEffect, useState } from 'react';

const Home = () => {
  const router = useRouter();
  const [lPaths, setLPaths] = useState([]);

  const navigateHandler = (learningPathId) => {
    router.push({
      pathname: '/builder',
      query: { learningPathId }
    })
  }

  const createLearningPath = async () => {
    const learningPathId = uuid();
    const schema = learningPathSchema;
    schema.id = learningPathId;

    const res = await learningPathService.save(schema);

    if (res.success) {
      navigateHandler(learningPathId);
    } else {
      console.log(res);
    }
  }

  const loadSummaries = async () => {
    const res = await learningPathService.getSummaries();
    setLPaths(res.data);
  }

  useEffect(() => {
    loadSummaries();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.externalContainer}>
        <div className={styles.rowContainer}>
          <SectionHeader>Rotas de Aprendizagem</SectionHeader>
          <Button type='primary' icon='MdAdd' onClickHandler={createLearningPath}>
            Nova Rota
          </Button>
        </div>
        {lPaths.map((el) => (
          <TableRow
            key={el.id}
            learningPathName={el.name}
            contentBadge='15 conteúdos'
            focusBadge='10 foco'
            id={el.id}
            navigate={() => navigateHandler(el.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
