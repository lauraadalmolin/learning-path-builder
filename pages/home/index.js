import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import uuid from 'react-uuid';

import Button from '../../components/button';
import ModalWindow from '../../components/modal-window';
import Navbar from '../../components/navbar';
import SectionHeader from '../../components/section-header';
import TableRow from '../../components/table-row';

import learningPathService from '../../service/learning-path.service';
import learningPathSchema from '../../constants/learning-path-schema.json';
import strings from '../../constants/strings.json';

import styles from './style.module.css';
import { assembleQuestion } from '../../utils/strings';

const Home = () => {
  const router = useRouter();
  const [lPaths, setLPaths] = useState([]);
  const [targetLPath, setTargetLPath] = useState(null);

  const navigateHandler = (learningPathId) => {
    router.push({
      pathname: '/builder',
      query: { learningPathId }
    });
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

  const showModal = (lPath) => {
    setTargetLPath(lPath);
  }

  const hideModal = () => {
    setTargetLPath(null);
  }

  const deleteLPath = async () => {
    const res = await learningPathService.delete(targetLPath.id);
    if (res.success) {
      setLPaths((current) => current.filter((lPath) => lPath.id !== targetLPath.id));
      // show feedback toast
    } else {
      console.log(res.error);
      // show feedback toast
    }

    hideModal();
  }

  const downloadLPath = () => {
    console.log('TODO: Download fn');
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
      { targetLPath !== null && <ModalWindow 
        cancelHandler={hideModal}
        confirmHandler={deleteLPath}
        title={strings.confirmExclusionModalTitle}
        description={assembleQuestion(strings.confirmExclusionModalDescription, targetLPath.name)}/>
      }
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
            contentBadge='15 conteúdos'
            focusBadge='10 foco'
            lPath={el}
            deleteHandler={showModal}
            downloadHandler={downloadLPath}
            navigateHandler={() => navigateHandler(el.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
