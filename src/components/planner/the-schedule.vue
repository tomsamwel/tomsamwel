<template>
  <div class="schedule">
    <transition name="slide-fade">
      <div
        v-show="scheduleItemsListVisible"
        class="schedule-items"
      >
        <slot name="scheduleItems" />
      </div>
    </transition>

    <div class="schedule-timestamps">
      <div class="schedule-timestamps__corner" />
      <div
        v-for="hour of scheduleHours"
        :key="hour.index"
        class="schedule-timestamps__hour"
        :style="hourHeightStyles"
      >
        <div class="schedule-timestamps__timehuman">
          {{ timeHuman(hour) }}
        </div>
      </div>
    </div>
    <div class="schedule__days">
      <slot name="scheduleDays" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    scheduleItemsListVisible: Boolean
  },

  computed: {
    hourHeightStyles() {
      return this.$store.getters["schedule/hourHeightStyles"];
    },

    scheduleHours() {
      return this.$store.getters["schedule/hoursArray"];
    }
  },

  methods: {
    timeHuman(hour) {
      while (String(hour).length < 2) {
        hour = "0" + hour;
      }
      return `${hour}:00`;
    }
  }
};
</script>

<style lang="scss">
.schedule {
	display: flex;
	overflow-y: scroll;

	.schedule-items {
		min-width: 15rem;
		max-width: 20rem;
		margin-top: 3rem;
		overflow-y: auto;
		padding: 0.2rem;
		scroll-snap-type: y mandatory;
		.participant-item {
			margin-bottom: 0.3rem;
			scroll-margin-top: 0.15rem;
			scroll-snap-align: start;
		}
	}

	.schedule-timestamps {
		z-index: 25;
		position: sticky;
		left: 0;
		margin-right: 1rem;
		padding-left: 1rem;
		background-image: linear-gradient(
			to right,
			rgba(248, 248, 248, 1),
			rgba(248, 248, 248, 0.7)
		);
		&__corner {
			height: 3rem;
			min-height: 3rem;
			max-height: 3rem;
		}
		&__hour {
			width: 100%;
			border-top: 1px solid rgba(0, 0, 0, 0);
			padding-right: 1rem;
		}
		&__timehuman {
			margin-top: -0.8rem;
			color: #727575;
		}
	}
	&__days {
		display: flex;
	}
}
.slide-fade-enter-active {
	transition: all 300ms ease-out;
}
.slide-fade-leave-active {
	transition: all 300ms ease-in;
}
.slide-fade-enter,
.slide-fade-leave-to {
	transform: translateX(-30rem);
	opacity: 0;
}
</style>
