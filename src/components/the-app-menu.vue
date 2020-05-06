<template>
	<div class="menu">
		<div @click="toggle" class="menu__toggle bubble" :class="{isOpen : isVisible}">
			<span></span>
			<span></span>
			<span></span>
		</div>

		<transition name="fade">
			<div v-show="isVisible" @click="isVisible = false" class="menu__overlay">
				<div class="menu-items">
					<MdRipple>
						<router-link to="/work" tag="div" class="menu-item">work</router-link>
					</MdRipple>
					<MdRipple>
						<router-link to="/about" tag="div" class="menu-item">about</router-link>
					</MdRipple>
					<MdRipple>
						<router-link to="/contact" tag="div" class="menu-item">contact</router-link>
					</MdRipple>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isVisible: false
		};
	},
	methods: {
		toggle() {
			this.isVisible = !this.isVisible;
		}
	}
};
</script>

<style lang="scss">
.menu {
	&__toggle {
		z-index: 501;
		position: fixed;
		top: 0.1rem;
		right: 0.5rem;
		padding: 1rem;
		width: 4rem;
		height: 4rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		cursor: pointer;
		background: #fff;

		-webkit-user-select: none;
		user-select: none;
		border-radius: 100%;
		transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
			background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;

		&:hover {
			background-color: rgb(0, 0, 0); /* Black fallback color */
			background-color: rgba(0, 0, 0, 0.9); /* Black w/opacity */
			span {
				background: #cdcdcd;
			}
		}

		span {
			display: block;
			width: 33px;
			height: 4px;
			margin-bottom: 5px;
			position: relative;
			background: #232323;
			border-radius: 3px;
			z-index: 1;
			transform-origin: 4px 0px;
			transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
				background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
				opacity 0.55s ease;
		}

		span:first-child {
			transform-origin: 0% 0%;
		}

		span:last-child {
			transform-origin: 0% 100%;
			margin-bottom: 0;
		}
	}
	&__toggle.isOpen {
		background-color: rgba(0, 0, 0, 0);

		&:hover {
			background: #cdcdcd;
			span {
				background: #232323;
			}
		}
		span {
			opacity: 1;
			transform: rotate(45deg) translate(4px, -7px);
			background: #cdcdcd;
		}

		span:nth-child(2) {
			opacity: 0;
			transform: rotate(0deg) scale(0.2, 0.2);
		}

		span:last-child {
			transform: rotate(-45deg) translate(4px, 7px);
		}
	}

	&__overlay {
		z-index: 500;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgb(0, 0, 0); /* Black fallback color */
		background-color: rgba(0, 0, 0, 0.9); /* Black w/opacity */

		display: flex;
		justify-content: center;
		align-items: center;
	}
}

.menu-items {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;

	.menu-item {
		height: 100%;
		width: 100%;
		text-transform: uppercase;
		color: #cdcdcd;
		transition: 500ms;
		text-decoration: none;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		&:hover,
		&.router-link-active {
			color: deeppink;
			font-weight: 600;
		}
	}
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.7s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
	position: absolute;
}
</style>