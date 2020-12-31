import path from 'path'
import typescript from 'rollup-plugin-typescript2'
// import {terser} from 'rollup-plugin-terser'

const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const componentName = process.env.COMPONENT.replace(/\.ts$/, '')
const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`))
const ShouldGenerateSourceMap = false

export default {
  input: resolve(`Components/${componentName}.ts`),
  output: [
    {
      file: resolve(`lib/${componentName}.es.js`),
      format: 'es', // the preferred format
      sourcemap: ShouldGenerateSourceMap
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    'qs',
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
      cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: ShouldGenerateSourceMap,
          declaration: false,
          declarationMap: false
        },
        exclude: ['**/__tests__', 'test-dts']
      }
    }),
    // terser() // minifies generated bundles
  ]
}
