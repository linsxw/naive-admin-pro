import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,

  // 自定义规则
  rules: {
    'curly': 'off',
    'no-console': 'off',
  },
})
