# 安装

`npm install`

# 启动

`npm run dev`

# 环境准备

1. [CSS 预处理器 - sass和scss](https://cn.vitejs.dev/guide/features.html#css-pre-processors)

```bash
# .scss and .sass
npm add -D sass
```

2. 代码风格统一

需要用到eslint和prettier，husky。eslint是代码错误检查，静态检查代码错误，prettier是代码格式化，保证代码样式风格统一。husky是提交代码检查，保证提交进入项目的代码一致。
三者一起使用，可以保证项目的风格统一，提高可读性和可维护性。

- 安装prettier

```bas
npm install --save-dev prettier
```

插件中心搜索prettier并安装插件。

可以直接在package.json中配置prettier，也可以单独创建一个配置文件.prettierrc.js。我就直接在package.json中配置了。避免了文件类型导致可能存在的问题。

```json
// package.json
{
  "name": "my-vue3-vite",
  // ...
  "devDependencies": {
    // ...
    "prettier": "3.1.0"
  },
  // ...
  "prettier": {
    // 可以在这里设置prettier
  }
}
```

踩坑：prettier设置中读取配置文件，地址配置了.prettierrc.js，没有该文件时报错。但我用不到，需要去除。

- 安装eslint

```bash
npm install --save-dev eslint
```

插件中心安装搜索并安装eslint

```bash
// 初始化eslint，可以根据项目进行配置，比如是否支持vue是否支持ts等，会根据设置生成配置，安装插件。
npx eslint  --init
```

然后安装prettier和eslint相关包.

```bash
# eslint-config-prettier https://github.com/prettier/eslint-config-prettier/
# Turns off all rules that are unnecessary or might conflict with Prettier.（关闭eslint和prettier冲突的规则）
# eslint-plugin-prettier https://www.npmjs.com/package/eslint-plugin-prettier
# Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.（有冲突的情况下，会优先使用prettier的设置，避免两个插件打架）

npm i eslint-config-prettier eslint-plugin-prettier -D
```

安装完成后`.eslintrc`中添加设置

```json
"plugins": ["prettier"],
"rules": {
  "prettier/prettier": "error"
}
```

根据我的项目，我这边最终安装的包如下。

```json
"devDependencies": {
    "@typescript-eslint/eslint-plugin": "^6.13.2",
    "@typescript-eslint/parser": "^6.13.2",
    "eslint": "^8.55.0",
    "eslint-plugin-vue": "^9.19.2",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.0.1",
  }
```

创建`.eslintignore`文件，避免某些文件被eslint检查。

修改`App.vue`文件，eslint正常报错，安装成功。调整prettier规则，eslint根据prettier规则报错，格式化文件可以通过prettier进行格式。

- 安装husky

```bash
npm install --save-dev husky
npm set-script prepare "husky install"
npm run prepare
#在这之后会生成一个husky文件夹
```

- husky辅助工具lint-staged，避免扫描整个项目出现意外报错和过长的扫描时间

```bash
npx husky add .husky/pre-commit "npm run lint:lint-staged"
```

然后再packege.json中添加lint-staged指令与配置

```json
// packege.json
"scripts": {
  // other scripts
    "lint:lint-staged": "lint-staged"
  },
"lint-staged": {
  "*.{js,ts}": [
    "eslint --fix", // --fix-dry-run代表出现错误时，尝试修复但不保存
    "prettier --write" // 执行prettier格式化文档
  ],
  "*.{cjs,json}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{vue,html}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{scss,css}": [
    "prettier --write"
  ],
  "*.md": [
    "prettier"
  ]
}

```

此时，有问题的文件在commit时就会报错，并在提示错误的文件和位置，eslint和prettier会自动格式化文档，并修复eslint错误。
事例：

```
  3:5  error  'a' is assigned a value but never used  @typescript-eslint/no-unused-vars
  3:9  error  Replace `'test'` with `"test";`         prettier/prettier
```

新增lint-staged.config.cjs 文件：（根据具体需求具体配置）

> 参考
>
> - [vite+ts+vue结合eslint、prettier、husky、lint-staged、commitlint搭建开发环境](https://juejin.cn/post/7258140838138511421)
> - [详细说明使用husky规范前端项目搭建](https://blog.csdn.net/du_aitiantian/article/details/130326158)
> - [全面搞懂ESLint与Prettier](https://blog.csdn.net/jayccx/article/details/128851057)
> - [eslint官网配置](https://zh-hans.eslint.org/docs/latest/use/getting-started#%E5%85%A8%E5%B1%80%E5%AE%89%E8%A3%85)

# 踩坑：

1. 试用husky执行指令时，换行报错出现`Delete ␍`

- 出现原因：prettier默认使用lf作为换行符，而windows使用crlf作为换行符，于是报错。
- 解决方法：

```bash
git config --global core.autocrlf false
```

- 参考：https://blog.csdn.net/yiguoxiaohai/article/details/128119129
