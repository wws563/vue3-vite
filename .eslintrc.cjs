module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'vue', 'prettier', 'html'],
  rules: {
    'prettier/prettier': 'error',
    'vue/multi-word-component-names': 'off', // vue支持单word文件
    '@typescript-eslint/no-explicit-any': 'off', // 关闭强any判定
    'no-undef': 'off', // unplugin-auto-import/vite插件需要关闭
  },
};
