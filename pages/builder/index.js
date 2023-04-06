import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import cytoscape from 'cytoscape';

import Navbar from '../../components/navbar';
import SideSection from '../../components/side-section';
import learningPathService from '../../service/learning-path.service';

import FORM_TYPE from '../../constants/form_type.json';

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
const STYLE = [
  {
    selector: 'node',
    style: {
      'text-halign': 'center',
      'text-valign': 'center',
    },
  },
  {
    selector: '.state',
    css: {
      'background-color': 'white',
      'border-color': 'rgb(104, 104, 104)',
      'border-width': '2px',
      'color': 'black',
      'width': '100px',
      'height': '100px',
      'label': 'data(title)',
    },
  },
  {
    selector: '.transition',
    css: {
      'background-color': 'black',
      'width': '60px',
      'height': '120px',
      'label': 'data(title)',
      'shape': 'rectangle',
      'color': 'white',
    },
  },
  {
    selector: 'edge',
    style: {
      'width': 5,
      'line-color': 'rgb(104, 104, 104)',
      'target-arrow-color': 'rgb(104, 104, 104)',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'label': 'data(title)',
      'text-margin-y': '-15px',
    },
  },
];  

const Builder = () => {
  const [cy, setCy] = useState();
  const [formType, setFormType] = useState(FORM_TYPE.Element);
  const [loading, setLoading] = useState(true);
  const [lPathData, setLPathData] = useState();
  const [selectedElement, setSelectedElement] = useState();
  const router = useRouter();

  const container = useRef();

  useEffect(() => {
    const cy = cytoscape({
      container: container.current,
      elements: ELEMENTS,
      style: STYLE,
      layout: {
        name: 'grid',
        rows: 1,
      }
    })

    cy.on('select', (event) => {
      const target = event.target;
      console.log(event);
      if (target === cy) {
        console.log('tap on background');
      } else {
        console.log(target.id());
        if (selectedElement !== null) {
          const el = cy.getElementById(selectedElement);
          console.log(el);
          el.style('background-color', 'white');
        }
        // event.target.style('background-color', 'magenta');
        setSelectedElement(target.id());
        // cy.add({
        //   data: { id: 'aaa', title: 'T0' },
        //   classes: ['transition'],
        // });
        // target.data('title', 'Início :)');
      }
    });

    // console.log(cy.json(), Object.keys(cy.json()));
    // const nodes = cy.json().elements.nodes;
    // console.log(nodes);
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

  const elementHandlerFn = (elementData) => {
    console.log(elementData);
    cy.add({
      data: { id: 'bacaca', title: 'T0' },
      classes: ['state'],
    },)
  }

  const transitionHandlerFn = (transitionData) => {

  }

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return <div className={styles.externalContainer}>
      <Navbar learningPathData={lPathData} showOptions={true} saveNameHandler={saveName} savePathHandler={savePath}/>
      <div className={styles.rowContainer}>
        <div ref={container} className={styles.container}></div>
        <SideSection 
          formType={formType} showForm={showFormHandler}
          elementHandler={elementHandlerFn} transitionHandler={transitionHandlerFn}/>
      </div>
    </div>;
  }

}


export default Builder;