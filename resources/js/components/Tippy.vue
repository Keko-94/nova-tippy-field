<template>
  <span v-if="tipContent"
        :id="'nova-simple-tooltip' + id "
        class="nova-simple-tooltip cursor-pointer items-center flex justify-center text-90 hover:text-primary"
        ref="tooltip">
    <span class="whitespace-no-wrap" v-if="text && !iconUrl" v-html="text"></span>
    <span class="mr-2" v-if="text && iconUrl && iconPosition === 'right'" v-html="text"></span>
    <img v-if="iconUrl" :width="iconSize" :src="iconUrl" alt="Image description." />
    <span class="inline-flex text-70" v-if="iconPath" v-html="iconPath"></span>
    <span class="ml-2" v-if="text && iconUrl && iconPosition === 'left'" v-html="text"></span>
  </span>
</template>

<script>
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export default {
  props: [
    'value', 'iconPath', 'iconUrl', 'iconSize', 'text',
    'iconPosition', 'tipContent', 'id', 'placement', 'tippyOptions'
  ],

  mounted() {
    this.$nextTick(() => {
      this.initTippy();

      this._themeObserver = new MutationObserver(() => {
        this.initTippy();
      });

      this._themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
    });
  },

  beforeUnmount() {
    if (this._themeObserver) {
      this._themeObserver.disconnect();
    }
    if (this._tippyInstance) {
      this._tippyInstance.destroy();
    }
  },

  methods: {
    initTippy() {
      if (!this.tipContent || this.tipContent === this.text) return;

      const isDark = document.documentElement.classList.contains('dark');

      const options = {
        content: this.tipContent,
        placement: this.placement,
        ...this.tippyOptions
      };

      if (isDark && options.theme === 'light-timeline') {
        delete options.theme;
      }

      if (this._tippyInstance && typeof this._tippyInstance.destroy === 'function') {
        this._tippyInstance.destroy();
      }

      if (this.$refs.tooltip) {
        this._tippyInstance = tippy(this.$refs.tooltip, options);
      }
    }
  }
}
</script>
