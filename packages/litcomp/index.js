'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/litcomp.cjs.js')
} else {
  module.exports = require('./dist/litcomp.es.js')
}
