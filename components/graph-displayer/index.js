import cytoscape from 'cytoscape';
import { useEffect, useState, useRef } from 'react';

import styles from './style.module.css';

const GraphDisplayer = ({ elements }) => {
  const container = useRef();
  const [cy, setCy] = useState();
  const [selectedElement, setSelectedElement] = useState();

  useEffect(() => {
    const cy = cytoscape({
      container: container.current, 
      elements: elements,
      style: [
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
      ],

      layout: {
        name: 'grid',
        rows: 1,
      },
    });

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
    const nodes = cy.json().elements.nodes;
    // console.log(nodes);
    setCy(nodes);
  }, []);

  

  return <div ref={container} className={styles.container}></div>
      
};

export default GraphDisplayer;
