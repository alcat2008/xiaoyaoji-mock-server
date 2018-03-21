/* eslint-disable quote-props, quotes */

const Ajv = require('ajv')

const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const SearchSchema = {
  // "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Search parameter schema",
  "description": "To validate search parameters",
  "type": "object",
  "properties": {
    "pageIndex": {
      "type": ["integer", "string"],
      "minimum": 1
    },
    "itemsPerPage": {
      "type": ["integer", "string"],
    },
    "variantFields": {
      "type": "array",
      "minItems": 0,
      "items": {
        "type": "object",
        "properties": {
          "fieldName": { "type": "string" },
          "fieldValue": { "type": "string" },
        },
      },
      "uniqueItems": true
    },
    "requestFilterFields": {
      "type": "array",
      "minItems": 0,
      "items": {
        "type": "object",
        "properties": {
          "fieldName": { "type": "string" },
          "value": { "type": "string" },
          "minValue": { "type": "string" },
          "maxValue": { "type": "string" }
        },
        "required": ["fieldName"]
      },
      "uniqueItems": true
    },
    "requestOrderFields": {
      "type": "array",
      "minItems": 0,
      "items": {
        "type": "object",
        "properties": {
          "orderField": { "type": "string" },
          "orderType": { "type": "string" }
        },
        "required": ["orderField", "orderType"]
      },
      "uniqueItems": true
    }
  },
  "required": ["pageIndex"]
}

function validateSearch(data) {
  const valid = ajv.validate(SearchSchema, data)
  return { result: valid, message: ajv.errors }
}

module.exports = { validateSearch }
