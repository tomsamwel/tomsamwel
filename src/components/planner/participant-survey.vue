<template>
	<details v-if="survey" class="survey">
		<summary class="survey__header">
			<i class="vds-icon vds-icon--blue vds-icon--expand_more"></i>
			<i class="vds-icon vds-icon--blue vds-icon--expand_less"></i>
			<strong>Reactie op enquête</strong>
			<br />
			{{survey.date}}
		</summary>
		<dl class="vds-definition-list survey__content">
			<div v-for="question of survey.questions" :key="question.id">
				<dt>{{question.question}}</dt>
				<dd>
					<ul v-if="question.answers && question.answers.length">
						<li v-for="answer in question.answers" :key="answer">{{answer}}</li>
					</ul>
				</dd>
				<div></div>
			</div>
		</dl>
	</details>
</template>

<script>
export default {
	props: {
		participantId: {
			type: Number
		}
	},

	computed: {
		survey() {
			return this.$store.getters["participants/surveyById"](
				this.participantId
			);
		}
	}
};
</script>

<style lang="scss">
.survey {
	border: 1px solid #d0d1d1;
	border-radius: 0.3rem;
	margin-bottom: 1rem;
	width: 100%;

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
</style>