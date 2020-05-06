<template>
	<div id="app">
		<TheAppMenu />
		<router-view />
	</div>
</template>

<script>
import TheAppMenu from "./components/the-app-menu";
export default {
	name: "App",
	components: { TheAppMenu }
};
</script>

<style lang="scss">
* {
	box-sizing: border-box;
}
.content {
	width: 100%;
	height: 100vh;
	overflow: scroll;
	background: #cdcdcd;
	padding-top: 1.5rem;
}

.bubble {
	animation-name: bubble;
	animation-duration: 10s;
	animation-iteration-count: infinite;
	animation-timing-function: ease;
}
.delay-0 {
	animation-delay: 0s;
}
.delay-1 {
	animation-delay: 1s;
}
.delay-2 {
	animation-delay: 2s;
}
@keyframes bubble {
	0% {
		scale: 1;
	}
	45% {
		scale: 1;
	}
	50% {
		scale: 1.1;
	}
	55% {
		scale: 1;
	}
	100% {
		scale: 1;
	}
}
</style>
