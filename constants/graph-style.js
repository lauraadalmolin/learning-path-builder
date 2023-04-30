
export const COLORS = {
  Primary: '#25aec0',
  Secondary: '#037381',
  PrimaryHighlight: 'rgb(164, 75, 236)',
  SecondaryHighlight: 'rgb(104, 40, 156)',
  Edge: 'gray'
}

export const STYLE = [
  {
    selector: 'node',
    css: {
      'content': 'data(title)',
      'text-valign': 'center',
      'text-halign': 'center',
      'background-color': COLORS.Primary,
      'shape': 'round-rectangle',
      'text-wrap': 'wrap',
      'color': 'white',
    }
  },
  {
    selector: ':parent',
    css: {
      'text-valign': 'bottom',
      'background-color': COLORS.Primary,
      'shape': 'round-rectangle',
      'font-size': '12px',
      'color': 'white',
      'text-margin-y': '12px',
      'text-wrap': 'wrap',
      'text-background-color': COLORS.Secondary,
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
      'line-cap': 'round',
      'line-color': COLORS.Edge,
      'target-arrow-color': COLORS.Edge
    }
  }
];