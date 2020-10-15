# utilsofweb

```sh
$ npm i utilsofweb
```

> usage: see [document](https://erluzi.github.io/utilsofweb/#/)

## support three build script

```
"scripts": {
  "build": "rollup -c",
  "build:all": "node scripts/build.js",
  "build:litcomp": "node scripts/buildLitcomp.js",
  ...
},
```

- build: 入口 index.ts
- build:all: 对 packages 下子项目 逐个打包
- build:litcomp: 对 packages 下 litcomp(web components) 打包

## dir: pr - some proposal that will not compile to dist

# issue

- 不支持在 node 环境使用 (document is undefined)
