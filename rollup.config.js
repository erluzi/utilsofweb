import path from 'path'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
import {terser} from 'rollup-plugin-terser'

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
      sourcemap: true
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
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
        exclude: ['**/__tests__', 'test-dts']
      }
    }),
    terser() // minifies generated bundles
  ]
}
