/*
 * @Author: 曹捷
 * @Date: 2021-11-11 17:29:49
 * @LastEditors: seepine
 * @LastEditTime: 2022-07-17 21:13:44
 * @Description: fileContent
 */
/**
 * 提供 ::: demo xxx ::: 语法，用于构建 markdown 中的示例
 */
const demoBlockContainers = require("./common/containers");
const { hash, path } = require("@vuepress/utils");
const prepareClientAppEnhanceFile = require("./prepareClientAppEnhanceFile");
const chokidar = require("chokidar");
module.exports = (options = {}) => {
  return (app) => {
    if (!options.path) {
      throw Error(
        "[vuepress-plugin-demo-block-vue3]:not find componentsDir,please BlockDemo({path:__dirname})"
      );
    }
    options = Object.assign(
      {
        components: {},
        componentsDir: path.resolve(options.path, "../examples"),
        componentsPatterns: ["**/*.vue"],
        getComponentName: (filename) =>
          path.trimExt(filename.replace(/\/|\\/g, "-")),
      },
      options
    );
    const optionsHash = hash(options);
    const { componentsDir, componentsPatterns } = options;
    return {
      name: "vuepress-plugin-demo-block-vue3",
      clientConfigFile: path.resolve(
        options.path,
        ".temp/register-components/client.js"
      ),
      onInitialized: () =>
        prepareClientAppEnhanceFile(app, options, optionsHash),
      extendsMarkdown: (md) => {
        md.use(demoBlockContainers(options));
      },
      onWatched: (app, watchers) => {
        if (componentsDir) {
          const componentsWatcher = chokidar.watch(componentsPatterns, {
            cwd: componentsDir,
            ignoreInitial: true,
          });
          componentsWatcher.on("add", () => {
            prepareClientAppEnhanceFile(app, options, optionsHash);
          });
          componentsWatcher.on("unlink", () => {
            prepareClientAppEnhanceFile(app, options, optionsHash);
          });
          watchers.push(componentsWatcher);
        }
      },
    };
  };
};
