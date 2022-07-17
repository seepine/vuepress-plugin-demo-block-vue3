# 快速上手

## 安装

### 安装 VuePress

请参考 Vuepress2 官方文档，[点此查看](https://v2.vuepress.vuejs.org/zh/guide/getting-started.html)

建议锁定版本`2.0.0-beta.49`，其他版本未测试不保证可使用。

### 安装插件

```bash
npm i vuepress-plugin-demo-block-vue3 -D
```

### 配置插件

打开 .vuepress/config.js 文件，然后在合适的位置引用插件：

- **配置扫描路径** `componentsDir`

```js
const blockDemo = require("vuepress-plugin-demo-block-vue3");
module.exports = {
  ...
  plugins: [[
    blockDemo({
      // 设置路径
      path: __dirname,
    })
  ]],
  ...
}
```

## 引入组件
可在`docs/.vuepress/client.js`引入组件，需要注意的是，第三方库可能还需要依赖，例如`ant-design-vue`还需要`less`和`less-loader`，请自行安装

```js
import { defineClientConfig } from '@vuepress/client'

// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";

// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";

// import ArcoVue from '@arco-design/web-vue';
// import ArcoVueIcon from '@arco-design/web-vue/es/icon';
// import '@arco-design/web-vue/dist/arco.css';

export default defineClientConfig({
  enhance({ app, router, siteData }) {
      // app.use(Antd)
      // app.use(ElementPlus)
      // app.use(ArcoVue);
      // app.use(ArcoVueIcon);
  },
  setup() {},
  rootComponents: [],
})
```

