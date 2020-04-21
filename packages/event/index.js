'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/event.cjs.js')
} else {
  module.exports = require('./dist/event.cjs.js')
}
