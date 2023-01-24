import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import GraphDisplayer from '../../components/graph-displayer';
import Navbar from '../../components/navbar';
import SideSection from '../../components/side-section';
import learningPathService from '../../service/learning-path.service';

import styles from './style.module.css';

const Builder = () => {
  const [lPathData, setLPathData] = useState();
  const router = useRouter();

  const loadLearningPathData = async (learningPathId) => {
    const res = await learningPathService.getById(learningPathId);  
    setLPathData(res);
  }

  const updateLPathData = (key, value) => {
    setLPathData((currentData) => {
      return {
        ...currentData,
        [key]: value,
      };
    });
  };

  const saveName = async (name) => {
    updateLPathData('name', name);
  }

  const savePath = async (event) => {
    const res = await learningPathService.save(lPathData);
    
    if (res.success) {
      console.log('Salvo com sucesso');
    } else {
      console.log(res.error);
    }
  }

  useEffect(() => {
    savePath();
  }, [lPathData]);

  useEffect(() => {
    if (!router.query.learningPathId) return;

    const learningPathId = router.query.learningPathId;
    loadLearningPathData(learningPathId);  

  }, [router.query]);

  return <div className={styles.externalContainer}>
    <Navbar learningPathData={lPathData} showOptions={true} saveNameHandler={saveName} savePathHandler={savePath}/>
    <div className={styles.rowContainer}>
      <GraphDisplayer/>
      <SideSection/>
    </div>
  </div>;
}

export default Builder;