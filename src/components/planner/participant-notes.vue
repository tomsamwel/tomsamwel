<template>
	<div class="note-list">
		<div v-for="note of notes" :key="note.id" class="note-item">
			{{note.notitie}}
			<br />
			<strong v-if="note.user && note.user.name">- {{note.user.name}},</strong>
			{{timeHuman(note.tijd)}}
			<a
				v-if="participantId && userId == note.user_id"
				class="note-item__edit"
			>wijzig</a>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		participantId: {
			type: Number,
			default: 0
		},

		konijnId: {
			type: Number,
			default: 0
		}
	},

	computed: {
		notes() {
			if (this.participantId)
				return this.$store.getters["notes/notesByParticipantId"](
					this.participantId
				);
			else if (this.konijnId)
				return this.$store.getters["notes/notesByKonijnId"](
					this.konijnId
				);
			else return [];
		},

		userId() {
			return this.$store.getters["schedule/userId"];
		}
	},

	methods: {
		timeHuman(timeString) {
			return new Intl.DateTimeFormat("default", {
				year: "numeric",
				month: "short",
				day: "numeric"
			}).format(new Date(timeString));
		},

		fetchNotes() {
			return;
			// if (this.notes.length) return;
			// if (this.participantId)
			// 	this.$store.dispatch(
			// 		"notes/fetchNotesByParticipantId",
			// 		this.participantId
			// 	);
			// if (this.konijnId)
			// 	this.$store.dispatch(
			// 		"notes/fetchNotesByKonijnId",
			// 		this.konijnId
			// 	);
		},

		openNoteEditor(noteId) {
			Event.$emit("editNote", {
				participantId: this.participantId,
				noteId: noteId
			});
		}
	},

	watch: {
		participantId: {
			immediate: true,
			handler: function() {
				if (!this.notes.length) this.fetchNotes();
			}
		},

		konijnId: {
			immediate: true,
			handler: function() {
				if (!this.notes.length) this.fetchNotes();
			}
		}
	}
};
</script>

<style lang="scss">
.note-list {
	width: 100%;
	.note-item {
		padding: 1rem;
		background-color: #fbf6d1;
		margin-bottom: 1rem;
		&__edit {
			cursor: pointer;
		}
	}
}
</style>