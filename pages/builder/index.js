import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import cytoscape from 'cytoscape';

import Navbar from '../../components/navbar';
import SideSection from '../../components/side-section';
import learningPathService from '../../service/learning-path.service';

import FORM_TYPE from '../../constants/form_type.json';

import styles from './style.module.css';
import { createElementNode } from '../../utils/graph-handler';

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
      'background-color': '#25aec0',
      'border-color': '#25aec0',
      'border-width': '2px',
      'border-radius': '4px',
      'color': 'white',
      'width': '220px',
      'compound-sizing-wrt-labels': 'include',
      'shape': 'round-rectangle',
      'label': 'data(title)',
      'padding': '20px',
      'text-wrap': 'wrap'
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

const STYLE2 = [
  {
    selector: 'node',
    css: {
      'content': 'data(title)',
      'text-valign': 'center',
      'text-halign': 'center',
      'background-color': '#25aec0',
      'border-color': '#25aec0',
      'shape': 'round-rectangle',
      'text-wrap': 'wrap',
      'color': 'white',
    }
  },
  {
    selector: ':parent',
    css: {
      'text-valign': 'bottom',
      'text-halign': 'bottom',
      'background-color': '#25aec0',
      'border-color': '#25aec0',
      'shape': 'round-rectangle',
      'font-size': '12px',
      'color': 'white',
      'text-margin-y': '12px',
      'text-wrap': 'wrap',
      'text-background-color': '#037381',
      'text-background-shape': 'round-rectangle',
      'text-background-opacity': '1',
      'text-background-padding': '8px'
    }
  },
  {
    selector: 'edge',
    css: {
      'curve-style': 'bezier',
      'target-arrow-shape': 'triangle',
      'source-text-margin-y': '10px',
      'source-endpoint':  'outside-to-line-or-label',
      'target-endpoint': 'outside-to-node-or-label',
      'source-distance-from-node': '2px',
      'target-distance-from-node': '2px',
      'line-cap': 'round'
    }
  }
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
    if (loading) return;

    const cy = cytoscape({
      container: container.current,
      // elements: lPathData?.graph,
      // style: STYLE,
      layout: { 
        name: 'preset',
        fit: true, // whether to fit to viewport
        padding: 100,
      },
      // minZoom: 0.5,
      // maxZoom: 1,
      boxSelectionEnabled: true,

      style: STYLE2,

      elements: {
        nodes: [
          { data: { id: 'a', title: 'Algoritmos e Estruturas de Dados', parent: 'b' }, position: { x: 215, y: 8 } },
          { data: { id: 'b', title: '|            Foco: 8             |' }, selectable: false },
          { data: { id: 'd', title: 'Algoritmos e Estruturas de Dados', parent: 'e' }, position: { x: 215, y: 120 } },
          { data: { id: 'e', title: 'Foco: 5' } },
        ],
        edges: [
          { data: { id: 'ad', source: 'b', target: 'e' } },
        ]
      },
    })

    // cy.on('select', (event) => {
    //   const target = event.target;
    //   console.log(event);
    //   if (target === cy) {
    //     console.log('tap on background');
    //   } else {
    //     console.log(target.id());
    //     if (selectedElement !== null) {
    //       const el = cy.getElementById(selectedElement);
    //       console.log(el);
    //       el.style('background-color', 'white');
    //     }
    //     // event.target.style('background-color', 'magenta');
    //     setSelectedElement(target.id());
    //     // cy.add({
    //     //   data: { id: 'aaa', title: 'T0' },
    //     //   classes: ['transition'],
    //     // });
    //     // target.data('title', 'Início :)');
    //   }
    // });

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
    const graph = cy.json().elements;
    updateLPathData('graph', graph);
    const res = await learningPathService.save(lPathData, graph);
    
    if (res.success) {
      console.log('Salvo com sucesso');
    } else {
      console.log(res.error);
    }
  }

  // useEffect(() => {
  //   if (!lPathData || !lPathData.id) return;
  //   savePath();
  // }, [lPathData?.name]);

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
    const elementNode = createElementNode(elementData);
    cy.add(elementNode);
  }

  const transitionHandlerFn = (transitionData) => {

  }

  const downloadPath = () => {
    console.log(cy.json(), Object.keys(cy.json()));
    const nodes = cy.json().elements.nodes;
    console.log(nodes);
  }

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return <div className={styles.externalContainer}>
      <Navbar learningPathData={lPathData} showOptions={true} saveNameHandler={saveName} savePathHandler={savePath} downloadPathHandler={downloadPath}/>
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