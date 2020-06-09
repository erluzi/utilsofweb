const fs = require('fs')
// const util = require('util')
// let readdir = util.promisify(fs.readdir)

let targets = fs.readdirSync('packages').filter(f => {
  if(!fs.statSync(`packages/${f}`).isDirectory()) {
    return false
  }
  const pkg = require(`../packages/${f}/package.json`)
  return !pkg.private
  // return true
})

console.log('targets: ', targets)

exports.targets = targets
