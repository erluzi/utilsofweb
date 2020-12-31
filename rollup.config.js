import path from 'path'
import typescript from 'rollup-plugin-typescript2'
import {terser} from 'rollup-plugin-terser'
// import resolve from '@rollup/plugin-node-resolve'
// import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'

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
    {
      file: pkg.unpkg,
      format: 'iife',
      name: 'UtilsOfWeb', // the global which can be used in browser
      sourcemap: true,
      globals: {
        qs: 'qs'
      }
    },
  ],
  // suppress the warning - (!) Unresolved dependencies
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
          sourceMap: false,
          declaration: true,
          declarationMap: false
        },
        exclude: ['**/__tests__']
      }
    }),
    // resolve(),
    // commonjs(),
    terser() // minifies generated bundles
  ]
}
