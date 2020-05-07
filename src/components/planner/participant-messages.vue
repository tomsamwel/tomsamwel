<template>
  <div class="messages-list">
    <details
      v-for="message of messages"
      :key="message.id"
      class="message-item"
      @click="archiveMessage(message)"
    >
      <summary class="message-item__header">
        <i class="vds-icon vds-icon--blue vds-icon--expand_more" />
        <i class="vds-icon vds-icon--blue vds-icon--expand_less" />
        <div
          v-if="!message.archived"
          class="vds-dot vds-dot--red"
        />
        <strong>{{ message.from }}</strong>
        &rsaquo; {{ message.to }}
        <br>
        {{ message.subject }}
      </summary>
      <p
        class="message-item__content"
        v-html="message.body"
      />
    </details>
  </div>
</template>

<script>
export default {
  props: {
    participantId: {
      type: Number,
      default: 0
    }
  },

  computed: {
    messages() {
      return this.$store.getters["participants/participantById"](
        this.participantId
      ).messages;
    }
  },

  methods: {
    archiveMessage(message) {
      if (message.archived) return;

      this.$store.dispatch("participants/archiveMessage", {
        messageId: message.id,
        participantId: this.participantId
      });
    }
  }
};
</script>

<style lang="scss">
.messages-list {
	.message-item {
		border: 1px solid #d0d1d1;
		border-radius: 0.3rem;
		margin-bottom: 1rem;

		i.vds-icon {
			position: absolute;
			top: 1rem;
			right: 1rem;
			display: block;
		}
		i.vds-icon--expand_less {
			display: none;
		}

		&[open] {
			i.vds-icon--expand_less {
				display: block;
			}
			i.vds-icon--expand_more {
				display: none;
			}
		}
		&__header {
			padding: 1rem;
			padding-right: 2rem;
			cursor: pointer;
			position: relative;
			&::-webkit-details-marker {
				display: none;
			}
		}
		&__content {
			padding: 1rem;
			border-top: 1px solid #d0d1d1;
			overflow: auto;
		}
	}
}
</style>