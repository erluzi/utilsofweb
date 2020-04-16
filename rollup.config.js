import path from 'path'
import typescript from 'rollup-plugin-typescript2'
// import pkg from './package.json'
import {terser} from 'rollup-plugin-terser'

const resolve = p => path.resolve(__dirname, p)

export default {
  input: 'src/index.ts',
  output: [
    {
      file: resolve('dist/index.cjs.js'),
      format: 'cjs'
    },
    {
      file: resolve('dist/index.esm.js'),
      format: 'es' // the preferred format
    },
    {
      file: resolve('dist/index.global.js'),
      format: 'iife',
      name: 'UtilsOfWeb' // the global which can be used in browser
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
    }),
    terser() // minifies generated bundles
  ]
}
