import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import cytoscape from 'cytoscape';

import Navbar from '../../components/navbar';
import SideSection from '../../components/side-section';
import learningPathService from '../../service/learning-path.service';

import { createElementNode, createFocusNode, createTransitionEdge, updateElementNode, updateFocusNode, updateTransitionEdge } from '../../utils/graph-handler';
import { downloadFile } from '../../utils/download-file';

import FORM_TYPE from '../../constants/form-type.json';

import styles from './style.module.css';

import { STYLE, COLORS } from '../../constants/graph-style';

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

    const updateElementColor = (id, isHighlight) => {
      const element = cy.getElementById(id);

      if (element.isEdge()) {
        const color = isHighlight ? COLORS.PrimaryHighlight : COLORS.Edge;
        element.style('line-color', color);
        element.style('target-arrow-color', color);
      } else {
        const color = isHighlight ? COLORS.PrimaryHighlight : COLORS.Primary
        const labelColor = isHighlight ? COLORS.SecondaryHighlight : COLORS.Secondary
        element.style('background-color', color);

        const parentElement = element.parent();
        parentElement.style('background-color', color);
        parentElement.style('text-background-color', labelColor);
      }
    }
    
    // tap on the background
    // cy.on('tap', (event) => {
    //   const targetElement = event.target;
    //   if (targetElement === cy) {
    //     setSelectedElement(null);
    //   }
    // });

    const handleSelection = (targetId, formType) => {
      const currSelectedId = selectedElementStateRef.current;

      if (currSelectedId == targetId) {
        return;
      }

      if (currSelectedId) {
        updateElementColor(currSelectedId, false);
      }

      setFormType(formType);
      setSelectedElement(targetId);
      updateElementColor(targetId, true)
    }

    cy.on('select', (event) => {
      const targetElement = event.target;
      if (targetElement.isEdge()) {
        handleSelection(targetElement.id(), FORM_TYPE.Transition);
      } else {
        const targetChildId = targetElement.isChild() ? targetElement.id() : targetElement.children()[0].id();
        handleSelection(targetChildId, FORM_TYPE.Element);
      }
    });

    setCy(cy);
  }, [loading]);

  const updateElementColor = (id, isHighlight) => {
    const element = cy.getElementById(id);

    if (element.isEdge()) {
      const color = isHighlight ? COLORS.PrimaryHighlight : COLORS.Edge;
      element.style('line-color', color);
      element.style('target-arrow-color', color);
    } else {
      const color = isHighlight ? COLORS.PrimaryHighlight : COLORS.Primary
      const labelColor = isHighlight ? COLORS.SecondaryHighlight : COLORS.Secondary
      element.style('background-color', color);

      const parentElement = element.parent();
      parentElement.style('background-color', color);
      parentElement.style('text-background-color', labelColor);
    }
  }

  const showFormHandler = (type) => {
    setFormType(type);
    updateElementColor(selectedElement, false);
    setSelectedElement(null);
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
    let elementNode, focusNode;
    if (elementData.id) {
      elementNode = cy.getElementById(elementData.id);
      updateElementNode(elementNode, elementData);
      
      focusNode = elementNode.parent();
      updateFocusNode(focusNode, elementData);

      // possible performance bottleneck since for big graphs it would require re-rendering
      const graphState = cy.elements().remove();
      graphState.restore();
    } else {
      focusNode = createFocusNode(elementData.focus);
      elementNode = createElementNode(elementData, focusNode.data.id);
    }
    cy.add(focusNode);
    cy.add(elementNode);
    await savePath();
  }

  const elementDeleteHandlerFn = async (elementId) => {
    const element = cy.getElementById(elementId);

    const parentElement = element.isChild() ? element.parent() : element;
    const childElement = element.isChild() ? element : element.children()[0];
    const connectedEdges = parentElement.connectedEdges();
    
    cy.remove(connectedEdges);
    cy.remove(childElement);
    cy.remove(parentElement);

    setSelectedElement(null);
    await savePath();
  }

  const transitionSubmitHandlerFn = async (transitionData) => {    
    if (transitionData.id) {
      // you will only be able to edit one arrow at a time
      // which means only one id at a time
      const transitionEdge = cy.getElementById(transitionData.id);
      updateTransitionEdge(transitionEdge, transitionData);
      
      // possible performance bottleneck since for big graphs it would require re-rendering
      const graphState = cy.elements().remove();
      graphState.restore();
    } else {
      for (const destination of transitionData.destinationElements) {
        const transitionEdge = createTransitionEdge(transitionData, destination);
        cy.add(transitionEdge);
      }
    }

    await savePath();
  }

  const transitionDeleteHandlerFn = async (transitionId) => {
    const transition = cy.getElementById(transitionId);
    cy.remove(transition);
    setSelectedElement(null);
    await savePath();
  }

  const cancelHandlerFn = () => {
    updateElementColor(selectedElement, false);
    setSelectedElement(null);
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
          elementSubmitHandler={elementSubmitHandlerFn} elementCancelHandler={cancelHandlerFn} elementDeleteHandler={elementDeleteHandlerFn}
          transitionSubmitHandler={transitionSubmitHandlerFn} transitionCancelHandler={cancelHandlerFn} transitionDeleteHandler={transitionDeleteHandlerFn}/>
      </div>
      <a id="downloadAnchorElem" className={styles.hiddenAnchor} />
    </div>;
  }
}

export default Builder;