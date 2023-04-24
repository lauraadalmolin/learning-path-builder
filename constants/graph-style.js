export const PRIMARY_COLOR = '#25aec0';
export const LABEL_COLOR = '#037381';
export const HIGHLIGHT_COLOR = 'rgb(164, 75, 236)';
export const LABEL_HIGHLIGHT_COLOR = 'rgb(104, 40, 156)';

export const STYLE = [
  {
    selector: 'node',
    css: {
      'content': 'data(title)',
      'text-valign': 'center',
      'text-halign': 'center',
      'background-color': PRIMARY_COLOR,
      'shape': 'round-rectangle',
      'text-wrap': 'wrap',
      'color': 'white',
    }
  },
  {
    selector: ':parent',
    css: {
      'text-valign': 'bottom',
      'background-color': PRIMARY_COLOR,
      'shape': 'round-rectangle',
      'font-size': '12px',
      'color': 'white',
      'text-margin-y': '12px',
      'text-wrap': 'wrap',
      'text-background-color': LABEL_COLOR,
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