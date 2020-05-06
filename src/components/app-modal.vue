<template>
	<div :id="name" class="vds-dialog js-dialog" v-show="isVisible">
		<div class="vds-dialog__overlay" tabindex="-1" @click="close"></div>
		<dialog class="vds-dialog__dialog" open>
			<slot>Something went wrong loading the data.</slot>
		</dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isVisible: false
		};
	},

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
	},

	mounted() {
		this.init();
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