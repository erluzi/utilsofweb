import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
// import {terser} from 'rollup-plugin-terser'

export default {
  input: 'index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: false
    },
    {
      file: pkg.module,
      format: 'es', // the preferred format
      sourcemap: false
    },
    // {
    //   file: resolve('dist/index.global.js'),
    //   format: 'iife',
    //   name: 'UtilsOfWeb', // the global which can be used in browser
    //   sourcemap: false
    // },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      typescript: require('typescript')
    }),
    // terser() // minifies generated bundles
  ]
}
