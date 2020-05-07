<template>
  <div class="inline-edit">
    <div
      v-show="!editing"
      class="inline-edit__trigger"
      @click="openEditor"
    >
      <slot name="trigger">
        {{ baseValue }}
      </slot>
    </div>
    <div
      v-show="editing"
      class="inline-edit__editor"
    >
      <slot name="editor">
        <input
          v-if="type === 'text'"
          ref="input"
          v-model="editedValue"
          class="vds-input"
          @blur="submit"
          @keyup.enter.stop="submit"
          @keyup.esc="cancel"
        >

        <textarea
          v-else-if="type === 'textarea'"
          ref="input"
          v-model="editedValue"
          class="vds-textarea"
          @blur="submit"
          @keyup.esc="cancel"
        />
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String },

    type: { type: String, default: "text" }
  },

  data() {
    return {
      editing: false,
      baseValue: this.value,
      editedValue: this.value
    };
  },

  watch: {
    value() {
      this.baseValue = this.value;
      this.editedValue = this.value;
    }
  },

  methods: {
    openEditor() {
      this.editing = true;

      this.$nextTick(() => {
        this.$refs.input.select();

        if (this.type === "textarea") this.scaleTextareaHeight();
      });
    },

    submit() {
      if (this.editedValue !== this.baseValue) {
        this.$emit("submit", this.editedValue);
      }
      this.editing = false;
    },

    cancel() {
      this.editedValue = this.baseValue;
      this.editing = false;
    },

    scaleTextareaHeight() {
      this.$refs.input.style.height =
        this.$refs.input.scrollHeight + 3 + "px";
    }
  }
};
</script>

<style lang="scss">
.inline-edit {
	&__trigger {
		display: inline-block;
		min-width: 1.5rem;
		border-bottom: 1px dotted #d0d1d1;
		&:hover {
			cursor: pointer;
			background: #d1e3fb;
			border-radius: 0.25rem;
		}
	}
	&__editor {
	}
}
</style>