import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import GraphDisplayer from '../../components/graph-displayer';
import Navbar from '../../components/navbar';
import SideSection from '../../components/side-section';
import learningPathService from '../../service/learning-path.service';

import styles from './style.module.css';

const ELEMENTS =  [
  {
    data: { id: 'a', weight: 500, title: 'Início' },
    classes: ['state'],
  },
  {
    data: { id: 'b', title: 'T0' },
    classes: ['transition'],
  },
  {
    data: { id: 'c', title: 'TAD' },
    classes: ['state'],
  },
  {
    data: { id: 'd', title: 'T1' },
    classes: ['transition'],
  },
  {
    data: { id: 'e', title: 'Ponteiros' },
    classes: ['state'],
  },
  {
    data: { id: 'f', title: 'Recursão' },
    classes: ['state'],
  },
  {
    data: { id: 'ab', source: 'a', target: 'b', title: '5' },
  },
  {
    data: { id: 'bc', source: 'b', target: 'c', title: '1' },
  },
  {
    data: { id: 'cd', source: 'c', target: 'd', title: '1' },
  },
  {
    data: { id: 'de', source: 'd', target: 'e', title: '1' },
  },
  {
    data: { id: 'df', source: 'd', target: 'f', title: '1' },
  },
];

const Builder = () => {
  const [loading, setLoading] = useState(true);
  const [lPathData, setLPathData] = useState();
  const router = useRouter();

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

  const savePath = async () => {
    const res = await learningPathService.save(lPathData);
    
    if (res.success) {
      console.log('Salvo com sucesso');
    } else {
      console.log(res.error);
    }
  }

  useEffect(() => {
    if (!lPathData || !lPathData.id) return;
    savePath();
  }, [lPathData]);

  const loadLearningPathData = async (learningPathId) => {
    const res = await learningPathService.getById(learningPathId);
    if (res.success) {
      setLPathData(res.data);
      setLoading(false);
    } else {
      router.push('/main');
      // add toast saying it doesn't exist
    }
  };

  useEffect(() => {
    if (!router.query.learningPathId) return;

    const learningPathId = router.query.learningPathId;
    loadLearningPathData(learningPathId);  

  }, [router.query]);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return <div className={styles.externalContainer}>
      <Navbar learningPathData={lPathData} showOptions={true} saveNameHandler={saveName} savePathHandler={savePath}/>
      <div className={styles.rowContainer}>
        <GraphDisplayer elements={ELEMENTS}/>
        <SideSection/>
      </div>
    </div>;
  }

}


export default Builder;