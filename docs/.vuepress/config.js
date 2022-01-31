const { path } = require("@vuepress/utils");

module.exports = {
  host: "0.0.0.0",
  title: "vuepress-plugin-demo-block-vue3",
  description: "编写组件库文档的增加 Vue 展示和代码示例",
  port: 6688,
  // head: [
  //   [
  //     "link",
  //     {
  //       rel: "icon",
  //       href: "/favicon.ico",
  //     },
  //   ],
  // ],
  locales: {
    "/": {
      lang: "zh-CN", // 将会被设置为 <html> 的 lang 属性
    },
  },
  themeConfig: {
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
  },
  plugins: [
    [
      require("./../../src"),
      {
        componentsDir: path.resolve(__dirname, "./../examples"),
      },
    ],
  ],
  markdown: {
    lineNumbers: true,
  },
};
