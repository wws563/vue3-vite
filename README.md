# 安装
`npm install`

# 启动
`npm run dev`

# 环境准备
1. [CSS 预处理器 - sass和scss](https://cn.vitejs.dev/guide/features.html#css-pre-processors)

`# .scss and .sass
npm add -D sass`

2. 代码风格统一

需要用到eslint和prettier，husky。eslint是代码检查，prettier是代码格式化，husky是提交代码检查。
三者一起使用，可以保证项目的风格统一，提高可读性和可维护性。

- 安装prettier
`npm install --save-dev prettier`

- 配置prettier
可以直接在package.json中配置prettier，也可以单独创建一个配置文件.prettierrc.js。我就直接在package.json中配置了。避免了文件类型导致可能存在的问题。

`{
  "name": "my-vue3-vite",
  // ...
  "devDependencies": {
		// ...
    "prettier": "3.1.0",
  },
	// ...
  "prettier": {
    // 可以在这里设置prettier
  }
}`





[vite+ts+vue结合eslint、prettier、husky、lint-staged、commitlint搭建开发环境](https://juejin.cn/post/7258140838138511421)