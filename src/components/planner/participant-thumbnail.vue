<template>
	<div class="participant-thumbnail" :class="{'participant-thumbnail--spare' : participant.spare }">
		<div class="participant-thumbnail__name">
			<div v-if="unreadMessagesCount" class="vds-dot vds-dot--red"></div>
			{{ name }}
		</div>

		<div class="participant-thumbnail__profile">
			<span
				v-if="participant.status[1] !== 'blanco'"
				class="vds-badge vds-badge--yellow participant-thumbnail__status"
				:class="statusColorClass"
			>{{ participant.status[1].charAt(0) }}</span>

			<span>
				{{ profile }},
				{{participant.participant.city? participant.participant.city.name : participant.participant.woonplaats}}
			</span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		participantId: {
			type: [Number, String],
			required: true
		}
	},

	computed: {
		participant() {
			return this.$store.getters["participants/participantById"](
				this.participantId
			);
		},

		name() {
			return (
				this.participant.participant.name ??
				[
					this.participant.participant.voornaam,
					this.participant.participant.tussenvoegsel,
					this.participant.participant.achternaam
				]
					.join(" ")
					.trim()
			);
		},

		profile() {
			return (
				this.participant.participant.profiel ??
				[
					this.participant.participant.geslacht,
					this.participant.participant.age,
					this.participant.participant.opleiding
				]
					.join(" ")
					.trim()
					.toUpperCase()
			);
		},

		unreadMessagesCount() {
			return this.$store.getters["participants/unreadMessageCountById"](
				this.participantId
			);
		},

		statusColorClass() {
			if (
				this.participant.status_noshow ||
				this.participant.status_afgebeld
			)
				return "vds-badge--red"; //rgba(235, 153, 153,.5)
			if (
				this.participant.status_show ||
				this.participant.status_bevestigd
			)
				return "vds-badge--green"; //  rgba(153, 235, 153,.8)
			if (this.participant.status_gemaild) return "vds-badge--green-80"; //rgba(200, 235, 153,.8)
			if (this.participant.status_gesproken) return "vds-badge--green-60"; // rgba(235, 235, 153,.8)
			if (this.participant.status_voicemail)
				return "vds-badge--orange-80";
			else return "vds-badge--orange-80";
		}
	}
};
</script>

<style lang="scss">
.participant-thumbnail {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: space-evenly;
	padding: 0.5rem 1rem;
	background-color: #fff;
	border-radius: 0.5rem;
	overflow: hidden;
	cursor: grab;

	&--spare {
		background: repeating-linear-gradient(
			-55deg,
			#fff,
			#fff 1rem,
			#f8f8f8 1rem,
			#f8f8f8 2rem
		);
	}

	&__name {
		font-weight: 800;
		margin-right: 0.5rem;
	}
	&__status {
		margin-right: 0.5rem;
	}
	&__profile {
		font-size: 90%;
		color: grey;
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
</style>
