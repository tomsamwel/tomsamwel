<template>
	<div
		class="slot"
		:class="{ dropzone : isEnabled}"
		:style="slotHeightStyles"
		@dragenter.prevent="dragenter"
		@dragover.prevent
		@drop.prevent
		:data-timehuman="timehuman"
	></div>
</template>

<script>
export default {
	props: { timehuman: String, isEnabled: { type: Boolean, default: true } },

	computed: {
		slotHeightStyles() {
			return this.$store.getters["schedule/slotHeightStyles"];
		},

		draggedElementId() {
			return this.$store.getters["schedule/draggedElementId"];
		},

		amountOfSlotsOccupied() {
			return this.$store.getters["schedule/sessionLengthMinutes"] / 5;
		}
	},

	methods: {
		dragenter() {
			if (this.isEnabled) {
				let draggedEl = document.getElementById(this.draggedElementId);
				draggedEl.firstElementChild.innerHTML = this.timehuman;
				this.$el.appendChild(draggedEl);
			}
		}
	}
};
</script>


<style lang="scss">
.slot {
	width: 100%;
	position: relative;
	overflow: visible;
	background-color: rgba(0, 0, 0, 0.05);

	.draggable {
		position: absolute;
	}
}
.available {
	-webkit-box-shadow: -0.5rem 0 0 0 #78d250;
	-moz-box-shadow: -0.5rem 0 0 0 #78d250;
	box-shadow: -0.5rem 0 0 0 #78d250;
}

.dropzone {
	background-color: unset !important;
}
.dropzone .draggable {
	z-index: 10;
}
.dropzone .draggable.selected {
	z-index: 11;
}
.isDragging .dropzone {
	z-index: 15;
}
.isDragging .dropzone .draggable.dragged {
	z-index: 5;
}
</style>