const blockDemo = require("./../../src");
const { defaultTheme } = require("@vuepress/theme-default");
const { viteBundler } = require("@vuepress/bundler-vite");
module.exports = {
  host: "0.0.0.0",
  title: "vuepress-plugin-demo-block-vue3",
  description: "编写组件库文档的增加 Vue 展示和代码示例",
  port: 6688,
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  bundler: viteBundler({}),
  theme: defaultTheme({
    navbar: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "指南",
        children: [
          "/guide/get-started.md",
          "/guide/install.md",
          "/guide/demo.md",
        ],
      },
      {
        text: "GitHub",
        link: "https://github.com/seepine/vuepress-plugin-demo-block-vue3.git",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "指南",
          isGroup: true,
          children: [
            {
              text: "介绍",
              children: [
                "/guide/get-started.md",
                "/guide/install.md",
                "/guide/demo.md",
              ],
            },
          ],
        },
      ],
    },
  }),
  plugins: [
    [
      blockDemo({
        path: __dirname,
      }),
    ],
  ],
  markdown: {
    lineNumbers: true,
  },
};
