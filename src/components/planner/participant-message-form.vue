<template>
  <div class="new-message">
    <div v-html="formHtml" />
  </div>
</template>

<script>
export default {
  props: ["modal"],

  data() {
    return {
      participantId: 0,
      formUrl: "",
      formHtml: ""
    };
  },

  watch: {
    formHtml: function() {
      this.$nextTick(() => {
        this.initCloseButton();
        this.initFormHandler();
      });
    }
  },

  mounted() {
    Event.$on("newMessage", participantId => {
      this.participantId = participantId;
      this.formUrl = `/deelnamereactie/add?deelname_id=${participantId}`;

      this.init();
    });

    Event.$on("newReply", payload => {
      this.participantId = payload.participantId;
      this.formUrl = `/deelnamereactie/${payload.messageId}/reply`;

      this.init();
    });

    Event.$on("newConfirmation", participantId => {
      this.participantId = participantId;
      this.formUrl = `/deelname/${participantId}/confirm`;

      this.init();
    });
  },

  methods: {
    openModal() {
      Event.$emit(`open${this.modal}`);
    },

    closeModal() {
      Event.$emit(`close${this.modal}`);
    },

    init() {
      fetch(this.formUrl)
        .then(response => {
          if (!response.ok) this.closeModal();
          else
            response.text().then(text => {
              this.formHtml = text;
              this.openModal();
            });
        })
        .catch(error => {
          console.error("Error:", error);
          this.closeModal();
        });
    },

    initCloseButton() {
      let closeButton = document.querySelector(
        `#${this.modal} .js-dialog-close`
      );
      closeButton.addEventListener("click", () => {
        this.closeModal();
      });
    },

    initFormHandler() {
      const form = document.querySelector(`#${this.modal} form`);

      form.addEventListener("submit", event => {
        event.preventDefault();

        // Post data using the Fetch API
        fetch(form.action, {
          method: form.method,
          body: new FormData(form)
        })
          .then(() => {
            this.$store.dispatch("participants/fetchMessages", {
              participantId: this.participantId
            });
          })
          .catch(error => {
            console.error("Error:", error);
          });
        this.closeModal();
      });
    }
  }
};
</script>