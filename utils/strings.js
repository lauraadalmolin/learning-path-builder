import _ from 'lodash';

const assembleQuestion = (part1, part2) => {
  return `${part1} ${part2}?`
}

const truncateString = (string) => {
  return _(string).truncate(12) + '...';
}

export { assembleQuestion, truncateString };