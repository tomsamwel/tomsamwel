<template>
  <div class="new-note">
    <div v-html="formHtml" />
  </div>
</template>

<script>
export default {
  props: ["modal"],

  data() {
    return {
      participantId: 0,
      noteId: 0,
      formHtml: ""
    };
  },

  watch: {
    formHtml: function() {
      this.$nextTick(() => {
        this.initCloseButton();
        this.initFormHandler();
        this.initDeleteButton();
      });
    }
  },

  mounted() {
    Event.$on("newNote", participantId => {
      this.participantId = participantId;
      this.init();
    });
    Event.$on("editNote", payload => {
      this.participantId = payload.participantId;
      this.noteId = payload.noteId;
      this.initEditor();
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
      let url = `/notities/add?deelname_id=${this.participantId}`;

      fetch(url)
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
        });
    },

    initEditor() {
      let url = `/notities/${this.noteId}/edit`;

      fetch(url)
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
            this.$store.dispatch(
              "notes/fetchNotesByParticipantId",
              this.participantId
            );
          })
          .catch(error => {
            console.error("Error:", error);
          });
        this.closeModal();
      });
    },

    initDeleteButton() {
      if (!this.noteId) return;

      let deleteButton = document.querySelector(
        `#${this.modal} a.a--destructive`
      );
      if (deleteButton) {
        deleteButton.addEventListener("click", event => {
          event.preventDefault();
          fetch(deleteButton.href)
            .then(() => {
              this.$store.dispatch(
                "notes/removeNoteById",
                this.noteId
              );
              this.closeModal();
            })
            .catch(error => {
              console.error("Error:", error);
            });
        });
      }
    }
  }
};
</script>