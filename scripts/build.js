const fs = require('fs-extra')
const path = require('path')
const execa = require('execa')
const { targets } = require('./utils.js')

run().then(() => console.log('build over'))

async function run() {
  await buildAll(targets)
}

async function buildAll(targets) {
  for(const target of targets) {
    await build(target)
  }
}

async function build(target) {
  const pkgDir = path.resolve(`packages/${target}`)
  const pkg = require(`${pkgDir}/package.json`)
  if(pkg.private) {
    return
  }
  await fs.remove(`${pkgDir}/dist`)
  await execa(
    'rollup',
    [
      '-c',
      ['rollup.execa.js'],
      '--environment',
      [
        `TARGET:${target}`
      ]
        .filter(Boolean)
        .join(',')
    ],
    {
      stdio: 'inherit'
    }
  )
}
