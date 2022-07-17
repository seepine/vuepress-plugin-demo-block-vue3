import { defineClientConfig } from "@vuepress/client";

// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";

// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";

// import ArcoVue from '@arco-design/web-vue';
// import ArcoVueIcon from '@arco-design/web-vue/es/icon';
// import '@arco-design/web-vue/dist/arco.css';

export default defineClientConfig({
  enhance({ app }) {
    // app.use(Antd)
    // app.use(ElementPlus)
    // app.use(ArcoVue);
    // app.use(ArcoVueIcon);
  },
  setup() {},
  rootComponents: [],
});
