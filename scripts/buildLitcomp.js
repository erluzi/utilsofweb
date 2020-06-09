const fs = require('fs-extra')
const path = require('path')
const execa = require('execa')

build_litcomp().then(() => console.log('litcomp build over'))

async function build_litcomp() {
  const target = 'litcomp'
  let components = fs.readdirSync('packages/litcomp/Components')
  console.log('components: ', components)
  let libDir = path.resolve('packages/litcomp/lib')
  await fs.remove(libDir)
  for(const component of components) {
    await execa(
      'rollup',
      [
        '-c',
        ['rollup.litcomp.js'],
        '--environment',
        [
          `TARGET:${target}`,
          `COMPONENT:${component}`,
        ]
          .filter(Boolean)
          .join(',')
      ],
      {
        stdio: 'inherit'
      }
    )
  }
}
