export const STYLE = [
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
      'text-background-padding': '8px',
      'content': 'data(title)',
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