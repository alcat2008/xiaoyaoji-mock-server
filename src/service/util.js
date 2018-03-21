const _ = require('lodash')


function arr2obj(array, key) {
  if (_.isArray(array)) {
    return array.reduce((result, item) => {
      result[item[key]] = item
      return result
    }, {})
  }
  return array
}

function smartDeepClone(value, customizer) {
  if (_.isArray(value)) {
    return value.map(item => smartDeepClone(item, customizer))
  }

  if (_.isObject(value)) {
    const retValue = {}
    Object.keys(value).forEach(key => {
      retValue[customizer(key)] = smartDeepClone(value[key], customizer)
    })
    return retValue
  }

  return value
}

function arrayProcessor(value) {
  if (_.isArray(value)) return value
  return [value]
}

function objectProcessor(value) {
  if (_.isObject(value)) return value
  if (_.isArray(value) && value.length > 0) return value[0]
  return {}
}

module.exports = { arr2obj, smartDeepClone, arrayProcessor, objectProcessor }
