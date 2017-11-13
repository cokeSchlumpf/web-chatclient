import _ from 'lodash';

const flattenObject = (obj, prefix = '') => _.reduce(_.keys(obj), (result, key) => {
  const value = obj[key];

  if (_.isObjectLike(value)) {
    return _.assign({}, result, flattenObject(value, `${prefix}${key}.`));
  } else {
    return _.assign({}, result, {
      [`${prefix}${key}`]: value
    });
  }
}, {});

export default flattenObject;