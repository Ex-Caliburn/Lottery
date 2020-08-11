# lottery

简单的双色球，大乐透demo，[页面展示](https://ex-caliburn.github.io/Lottery/)

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 坑

1. npm run test:unit,vue.config.js 中 splitChunks 会导致不运行失败，但是又不会抛错
