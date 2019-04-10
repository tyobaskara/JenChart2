const _toFixed = (number, round) => {
  const num = number.toString();
  return num.indexOf('.') !== -1
    ? num.substring(0, num.indexOf('.') + (round + 1))
    : num;
};

const _formatAxisLabel = (value, units) => {
  const val = value.toString().replace('-', '').split('.')[0];
  const ifMinus = value.toString().indexOf('-') > -1 ? '-' : '';

  if (val.length > 9) {
    return `${ifMinus + _toFixed(val / 1000000000, 2)}${units[0]}`;
  } else if (val.length > 6) {
    return `${ifMinus + _toFixed(val / 1000000, 2)}${units[1]}`;
  } else {
    return `${ifMinus + _toFixed(val / 1000, 2)}${units[2]}`;
  }
};

const _getMonthNumber = str => str.split('T')[0].split('-')[1];

const _getYear = str => str.split('T')[0].split('-')[0];

const _selectObject = (obj, param, val) => obj.find(o => o[param] === val);

const _isEqual = (val1, val2) => {
  return val1 === val2;
};

export {
  _isEqual,
  _toFixed,
  _formatAxisLabel,
  _getMonthNumber,
  _getYear,
  _selectObject
};
