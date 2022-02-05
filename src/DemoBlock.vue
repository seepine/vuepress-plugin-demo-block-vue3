<template>
  <div
    class="demo-block"
    :class="[blockClass, { 'hover': hovering }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div class="demo-content">
      <component :is="componentName" v-if="componentName" v-bind="$attrs" />
    </div>
    <div class="meta" ref="meta">
      <div class="description" v-html="decodeDesc" v-if="decodeDesc"></div>
      <div class="code-content" v-html="decoded"></div>
    </div>
    <div
      class="demo-block-control"
      :class="{ 'is-fixed': fixedControl }"
      :style="{ 'width': fixedControl ? `${codeContentWidth}px` : 'unset' }"
      ref="control"
      @click="isExpanded = !isExpanded"
    >
      <transition name="arrow-slide">
        <i :class="[iconClass, { 'hovering': hovering }, 'icon']"></i>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
      <span
        v-show="!copied && isExpanded"
        :class="['copy-action', { 'copying ': copied }]"
        @click.stop="copyCode"
      >{{ copiedText }}</span>
      <transition name="fade">
        <span
          v-show="copied"
          class="copy-action copy-action-success"
          @click.stop="copyCode"
        >{{ copiedText }}</span>
      </transition>
    </div>
  </div>
</template>

<script >
import defaultLang from './i18n/default_lang.json';
export default {
  data() {
    return {
      hovering: false,
      copied: false,
      isExpanded: false,
      fixedControl: false,
      codeContentWidth: 0,
      scrollParent: null
    };
  },
  props: {
    description: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    componentName: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    decoded() {
      return decodeURIComponent(this.source)
    },
    decodeDesc() {
      return decodeURIComponent(this.description)
    },
    compoLang() {
      return this.options.locales || defaultLang
    },
    langConfig() {
      return this.compoLang.filter(config => config.lang === this.$lang)[0]['demo-block'];
    },
    blockClass() {
      return `demo-${this.$lang} demo-${this.$route.path.split("/").pop().replace('.html', '')}`;
    },
    iconClass() {
      return this.isExpanded ? "caret-top" : "caret-bottom";
    },
    controlText() {
      return this.isExpanded ? this.langConfig['hide-text'] : this.langConfig['show-text'];
    },
    copiedText() {
      return this.copied ? this.langConfig['copy-success'] : this.langConfig['copy-text'];
    },
    codeArea() {
      return this.$el.getElementsByClassName("meta")[0];
    },
    codeAreaHeight() {
      if (this.$el.getElementsByClassName("description").length > 0) {
        return (
          this.$el.getElementsByClassName("description")[0].clientHeight +
          this.$el.getElementsByClassName("code-content")[0].clientHeight +
          30
        );
      }
      return this.$el.getElementsByClassName("code-content")[0].clientHeight + 20;
    }
  },
  methods: {
    copyCode() {
      if (this.copied) {
        return;
      }
      const pre = this.$el.querySelectorAll("pre")[0];
      pre.setAttribute("contenteditable", "true");
      pre.focus();
      document.execCommand("selectAll", false, null);
      this.copied = document.execCommand("copy");
      pre.removeAttribute("contenteditable");
      setTimeout(() => {
        this.copied = false;
      }, 1500);
    },
    scrollHandler() {
      this.$nextTick(() => {
        if (this.$refs && this.$refs.meta && this.$refs.meta.getBoundingClientRect) {
          const { top, bottom, left } = this.$refs.meta.getBoundingClientRect();
          this.fixedControl =
            bottom > document.documentElement.clientHeight &&
            top + 44 <= document.documentElement.clientHeight;
          this.$refs.control.style.left = this.fixedControl ? `${left + 1}px` : "0";
        }
      })
    },
    removeScrollHandler() {
      this.scrollParent &&
        this.scrollParent.removeEventListener('scroll', this.scrollHandler);
    }
  },
  watch: {
    isExpanded(val) {
      this.codeArea.style.height = val ? `${this.codeAreaHeight + 1}px` : "0";
      if (!val) {
        this.fixedControl = false;
        this.$refs.control.style.left = "0";
        this.removeScrollHandler();
        return;
      }
      setTimeout(() => {
        this.scrollParent = document;
        this.scrollParent &&
          this.scrollParent.addEventListener('scroll', this.scrollHandler);
        this.scrollHandler();
      }, 200);
    }
  },
  mounted() {
    this.$nextTick(() => {
      let codeContent = this.$el.getElementsByClassName('code-content')[0];
      this.codeContentWidth = this.$el.offsetWidth
      if (this.$el.getElementsByClassName('description').length === 0) {
        codeContent.style.width = "100%";
        codeContent.borderRight = "none";
      }
    });
  },
  beforeDestroy() {
    this.removeScrollHandler();
  }
};
</script>
<style scoped>
.demo-block {
  border: solid 1px var(--c-border);
  border-radius: 3px;
  transition: 0.2s;
  margin-top: 15px;
  margin-bottom: 15px;
}
.demo-block .demo-button {
  float: right;
}
.demo-block .demo-content {
  padding: 24px;
}
.demo-block .meta {
  background-color: var(--c-bg-light);
  border: solid 1px var(--c-border);
  margin: -1px;
  border-radius: 3px;
  overflow: hidden;
  height: 0;
  transition: height 0.2s;
}
.dark .demo-block .meta {
  background-color: var(--c-bg-lighter);
}
.demo-block .description {
  padding: 10px 20px;
  box-sizing: border-box;
  border: solid 1px var(--c-border);
  border-radius: 3px;
  font-size: 14px;
  line-height: 22px;
  color: var(--c-text-light);
  word-break: break-word;
  margin: 10px;
  background-color: var(--c-bg);
}
.demo-block .demo-block-control {
  border: solid 1px var(--c-border);
  margin-top: -11px;
  margin-bottom: -1px;
  margin-left: -1px;
  margin-right: -1px;
  height: 44px;
  box-sizing: border-box;
  background-color: var(--c-bg);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  text-align: center;
  color: var(--c-text-quote);
  cursor: pointer;
  position: relative;
}
.demo-block .demo-block-control.is-fixed {
  position: fixed;
  bottom: 1px;
  width: 660px;
  z-index: 999;
}
.demo-block .demo-block-control .icon {
  font-family: element-icons !important;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
}
.demo-block .demo-block-control .caret-top::before {
  margin-top: 6px;
  content: "";
  position: absolute;
  right: 50%;
  width: 0;
  height: 0;
  border-bottom: 6px solid var(--c-text-quote);
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
}
.demo-block .demo-block-control .caret-bottom::before {
  margin-top: 6px;
  content: "";
  position: absolute;
  right: 50%;
  width: 0;
  height: 0;
  border-top: 6px solid var(--c-text-quote);
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
}
.demo-block .demo-block-control:hover .caret-top::before {
  border-bottom: 6px solid var(--c-brand);
}
.demo-block .demo-block-control:hover .caret-bottom::before {
  border-top: 6px solid var(--c-brand);
}
.demo-block .demo-block-control i {
  font-size: 16px;
  line-height: 44px;
  transition: 0.3s;
}
.demo-block .demo-block-control i.hovering {
  transform: translateX(-40px);
}
.demo-block .demo-block-control > span {
  position: absolute;
  transform: translateX(-30px);
  font-size: 14px;
  line-height: 44px;
  transition: 0.1s;
  display: inline-block;
}
.demo-block .demo-block-control .copy-action {
  right: 0px;
  transition: 0;
  color: var(--c-text-quote);
}
.demo-block .demo-block-control .copy-action:hover {
  color: var(--c-brand);
}
.demo-block .demo-block-control .copy-action-success {
  color: var(--c-brand-light);
  font-weight: bold;
}
.demo-block .demo-block-control:hover {
  color: var(--c-brand);
  background-color: var(--c-bg-light);
}
.demo-block .demo-block-control:active {
  background-color: var(--c-bg-lighter);
}
.dark .demo-block .demo-block-control:hover {
  background-color: var(--c-bg-lighter);
}
.dark .demo-block .demo-block-control:active {
  background-color: var(--c-bg-light);
}
.demo-block .demo-block-control .control-button {
  line-height: 26px;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  padding-left: 5px;
  padding-right: 25px;
}
</style>
<style>
.demo-block .meta .code-content pre code {
  color: var(--c-text);
}
.token.tag {
  color: #3182bd;
}
.token.keyword {
  color: #c792ea;
}
.dark .toten.tag {
  color: var(--c-danger-bg);
}
</style>