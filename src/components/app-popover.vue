<template>
	<div class="popover" v-show="isVisible">
		<div class="popover__header">
			<div class="popover__title">
				<slot name="title">Popopver</slot>
			</div>
			<div @click="close" class="popover__close">
				<i class="vds-icon vds-icon--clear"></i>
			</div>
		</div>

		<div class="popover__content">
			<slot name="content">Popopver content</slot>
		</div>
	</div>
</template>

<script>
export default {
	props: { name: String },

	data() {
		return {
			isVisible: false,
			triggers: []
		};
	},

	methods: {
		open() {
			this.isVisible = true;
		},

		close() {
			this.isVisible = false;
		},

		initTriggers() {
			// global event trigger
			Event.$on("closePopovers", () => {
				this.close();
			});

			// custom triggers
			this.triggers = document.querySelectorAll(
				`#${this.name}-trigger, .${this.name}-trigger`
			);
			this.triggers.forEach(trigger => {
				trigger.addEventListener("click", ev => {
					this.trigger(ev, trigger);
				});
			});
		},

		trigger(ev, triggerEl) {
			if (!this.isVisible) {
				Event.$emit("closePopovers");
			}
			this.isVisible = !this.isVisible;

			if (this.isVisible)
				this.$nextTick(() => {
					this.positionToElement(triggerEl);
				});
		},

		positionToElement(element) {
			this.$el.style.marginTop =
				element.offsetTop + element.offsetHeight + "px";

			this.$el.style.marginLeft =
				element.offsetLeft +
				element.offsetWidth -
				this.$el.offsetWidth +
				"px";
		}
	},

	mounted() {
		this.initTriggers();
	}
};
</script>

<style lang="scss">
.popover {
	z-index: 100;
	border-radius: 0.25rem;
	margin-top: 1rem;
	position: fixed;
	max-width: 30em;
	background-color: #fff;
	box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.3),
		0 0.0625rem 0.125rem rgba(0, 0, 0, 0.2);

	&:before {
		// layout
		content: "";
		position: absolute;
		width: 0;
		height: 0;
		bottom: 100%;
		right: 1rem; // offset should move with padding of parent
		border: 0.75rem solid transparent;
		border-top: none;

		// looks
		border-bottom-color: #fff;
		filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));
	}
	&__header {
		display: flex;
		justify-content: space-between;

		padding: 1rem;
	}
	&__title {
		font-weight: 600;
		margin-right: 1rem;
	}
	&__close {
		cursor: pointer;
	}
}
</style>