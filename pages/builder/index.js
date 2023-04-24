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

import { STYLE, PRIMARY_COLOR, LABEL_COLOR, HIGHLIGHT_COLOR, LABEL_HIGHLIGHT_COLOR } from '../../constants/graph-style';

const Builder = () => {
  const [cy, setCy] = useState();
  const [formType, setFormType] = useState(FORM_TYPE.Element);
  const [loading, setLoading] = useState(true);
  const [lPathData, setLPathData] = useState();
  const [selectedElement, setSelectedElement] = useState();
  
  const router = useRouter();
  const container = useRef();

  const selectedElementStateRef = useRef();
  selectedElementStateRef.current = selectedElement;

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
      // boxSelectionEnabled: true
    })

    const updateElementColor = (childId, color, labelColor) => {
      const childElement = cy.getElementById(childId);
      childElement.style('background-color', color);

      const parentElement = childElement.parent();
      parentElement.style('background-color', color);
      parentElement.style('text-background-color', labelColor);
    }
    
    // cy.on('tap', (event) => {
    //   const targetElement = event.target;
    //   console.log(event);
    //   if (targetElement === cy) {
    //     console.log('hum, interesting')
    //     setSelectedElement(null);
    //   }
    // });

    cy.on('select', (event) => {
      const targetElement = event.target;

      const targetId = targetElement.id();
      const targetChildId = targetElement.isChild() ? targetId : targetElement.children()[0].id();
      const currSelectedId = selectedElementStateRef.current;

      if (currSelectedId == targetChildId) {
        return;
      }

      if (currSelectedId) {
        updateElementColor(currSelectedId, PRIMARY_COLOR, LABEL_COLOR);
      }

      setFormType(FORM_TYPE.Element);
      setSelectedElement(targetChildId);
      updateElementColor(targetChildId, HIGHLIGHT_COLOR, LABEL_HIGHLIGHT_COLOR)
    });

    setCy(cy);
  }, [loading]);

  const updateElementColor = (childId, color, labelColor) => {
    const childElement = cy.getElementById(childId);
    childElement.style('background-color', color);

    const parentElement = childElement.parent();
    parentElement.style('background-color', color);
    parentElement.style('text-background-color', labelColor);
  }

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

  const elementSubmitHandlerFn = async (elementData) => {
    if (elementData.id) {
      console.log('update element node');
    } else {
      const focusNode = createFocusNode(elementData.focus);
      const elementNode = createElementNode(elementData, focusNode.data.id);
      cy.add(focusNode);
      cy.add(elementNode);
    }
    await savePath();
  }

  const elementCancelHandlerFn = () => {
    updateElementColor(selectedElement, PRIMARY_COLOR, LABEL_COLOR)
    setSelectedElement(null);
  }

  const transitionSubmitHandlerFn = (transitionData) => {

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
          formType={formType} showForm={showFormHandler} selectedObj={selectedElement} lPathData={lPathData}
          elementSubmitHandler={elementSubmitHandlerFn} elementCancelHandler={elementCancelHandlerFn} transitionHandler={transitionSubmitHandlerFn}/>
      </div>
      <a id="downloadAnchorElem" className={styles.hiddenAnchor} />
    </div>;
  }
}

export default Builder;