import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import cytoscape from 'cytoscape';

import Navbar from '../../components/navbar';
import SideSection from '../../components/side-section';
import learningPathService from '../../service/learning-path.service';

import { createElementNode, createFocusNode } from '../../utils/graph-handler';
import { downloadFile } from '../../utils/download-file';

import FORM_TYPE from '../../constants/form-type.json';

import styles from './style.module.css';

import { STYLE } from '../../constants/graph-style';

const Builder = () => {
  const [cy, setCy] = useState();
  const [formType, setFormType] = useState(FORM_TYPE.Element);
  const [loading, setLoading] = useState(true);
  const [lPathData, setLPathData] = useState();
  const [selectedElement, setSelectedElement] = useState();
  const router = useRouter();

  const container = useRef();

  useEffect(() => {
    if (loading) return;

    const cy = cytoscape({
      container: container.current,
      elements: lPathData?.graph,
      style: STYLE,
      layout: { 
        name: 'preset',
        fit: true,
        padding: 100,
      },
      boxSelectionEnabled: true
    })

    setCy(cy);
  }, [loading]);

  const showFormHandler = (type) => {
    setFormType(type);
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

  const savePath = async () => {
    const graph = cy?.json().elements ?? null;
    if (graph == null) return;

    const res = await learningPathService.save(lPathData, graph);
    
    if (res.success) {
      console.log('Salvo com sucesso');
    } else {
      console.log(res.error);
    }
  }

  useEffect(() => {
    if (loading) return;
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

  const elementHandlerFn = async (elementData) => {
    const focusNode = createFocusNode(elementData.focus);
    const elementNode = createElementNode(elementData, focusNode.data.id);
    cy.add(focusNode);
    cy.add(elementNode);
    await savePath();
  }

  const transitionHandlerFn = (transitionData) => {

  }

  const downloadLPath = async () => {
    await savePath();
    const res = await learningPathService.getById(lPathData.id);
    const updatedLPath = res.data;
    downloadFile(document, updatedLPath);
  }

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return <div className={styles.externalContainer}>
      <Navbar learningPathData={lPathData} showOptions={true} saveNameHandler={saveName} savePathHandler={savePath} downloadPathHandler={downloadLPath}/>
      <div className={styles.rowContainer}>
        <div ref={container} className={styles.container}></div>
        <SideSection 
          formType={formType} showForm={showFormHandler}
          elementHandler={elementHandlerFn} transitionHandler={transitionHandlerFn}/>
      </div>
      <a id="downloadAnchorElem" className={styles.hiddenAnchor} />
    </div>;
  }
}

export default Builder;