'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/cache.cjs.js')
} else {
  module.exports = require('./dist/cache.cjs.js')
}
