import path from 'path'
import typescript from 'rollup-plugin-typescript2'
// import {terser} from 'rollup-plugin-terser'
// import babel from 'rollup-plugin-babel'

const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const name = path.basename(packageDir)
const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`))
const ShouldGenerateSourceMap = false

// 根据lib类型动态加载打包插件
let dynamicPlugin = []
// if (name === 'litcomp') {
//   dynamicPlugin.push(
//     babel({
//       exclude: 'node_modules/**'
//     })
//   )
// }

export default {
  input: resolve('src/index.ts'),
  output: [
    {
      file: resolve(`dist/${name}.cjs.js`),
      format: 'cjs',
      sourcemap: ShouldGenerateSourceMap
    },
    {
      file: resolve(`dist/${name}.es.js`),
      format: 'es', // the preferred format
      sourcemap: ShouldGenerateSourceMap
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
    [...dynamicPlugin]
  ]
}
