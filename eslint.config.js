// @ts-check
const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  unocss: true,
  rules: {
    curly: 'off',  
  },
})
