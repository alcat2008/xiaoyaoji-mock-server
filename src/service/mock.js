
const Mock = require('mockjs')

const Random = Mock.Random

const FieldTypes = {
  ARRAY: 'array[object]',
  OBJECT: 'object',
  STRING: 'string',
  DATE: 'date',
  LONG: 'long',
  NUMBER: 'number',
}

const DefaultFields = {
  pageNo: [1, 10],
  pageSize: [10, 10],
  records: [1, 100],
  pages: [1, 10],
}

function mockDefaultField(fieldName) {
  if (fieldName === 'records' || fieldName.includes('page')) {
    return Random.integer(...DefaultFields[fieldName])
  }
  return DefaultFields[fieldName]
}

// const randomIndex = Random.natural(0, dictionaryItems.length - 1)

function mockCollectionByType({ type, children, name }, dict) {
  // 缺省字段的处理
  if (DefaultFields[name]) {
    return mockDefaultField(name)
  }

  // 时间类型
  if (name.includes('time') || name.includes('Time')) {
    return Random.datetime('yyyy-MM-dd HH:mm:ss')
  }

  // 支持字典项
  if (dict && dict[name]) {
    return dict[name][Random.natural(0, dict[name].length - 1)]
  }

  switch (type) {
    case FieldTypes.ARRAY: {
      const dataLen = Random.natural(1, 10)
      const finalData = []
      for (let i = 0; i < dataLen; i++) {
        finalData.push(
          children.reduce((a, c) => {
            return {
              ...a,
              [c.name]: mockCollectionByType(c, dict)
            }
          }, {})
        )
      }

      return finalData
    }
    case FieldTypes.OBJECT: {
      const finalData = children.reduce((a, c) => {
        return {
          ...a,
          [c.name]: mockCollectionByType(c, dict)
        }
      }, {})

      return finalData
    }
    case FieldTypes.LONG:
    case FieldTypes.NUMBER:
      return Random.natural(0, 1000)
    case FieldTypes.DATE:
      // return new Date(Random.datetime()).getTime()
      return Random.datetime('yyyy-MM-dd HH:mm:ss')
    case FieldTypes.STRING:
      return Random.string()
    default:
      return Random.string()
  }
}

function mockResponse(response, dict) {
  const finalResponse = {
    code: 0,
    errmsg: '接口响应描述',
  }

  const responseData = response[2]
  if (responseData) {
    finalResponse.data = mockCollectionByType(responseData, dict)
  }

  return finalResponse
}

module.exports = { mockResponse }
