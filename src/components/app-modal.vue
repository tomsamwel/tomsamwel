<template>
  <div
    v-show="isVisible"
    :id="name"
    class="js-dialog vds-dialog"
  >
    <div
      class="vds-dialog__overlay"
      tabindex="-1"
      @click="close"
    />
    <dialog
      class="vds-dialog__dialog"
      open
    >
      <slot>Something went wrong loading the data.</slot>
    </dialog>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },

    options: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      isVisible: false
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    open() {
      this.isVisible = true;
    },

    close() {
      this.isVisible = false;
    },

    init() {
      Event.$on(`close${this.name}`, () => {
        this.close();
      });
      Event.$on(`open${this.name}`, () => {
        this.open();
      });
    }
  }
};
</script>

<style lang="scss">
.vds-dialog {
	&__overlay {
		z-index: 60;
	}
	&__dialog {
		z-index: 61;
	}
}
</style>