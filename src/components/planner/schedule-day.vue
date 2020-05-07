<template>
  <div
    class="fieldwork-day"
    :class="{isDragging: isDragging}"
  >
    <div class="fieldwork-day__date">
      {{ dateHuman }}
    </div>
    <div class="fieldwork-day__times">
      <div
        v-for="hour in scheduleHours"
        :key="hour"
        class="fieldwork-day__times__hour"
        :style="hourHeightStyles"
      >
        <scheduleSlot
          v-for="minute of intervals"
          :id="dateToId(hour, minute)"
          :key="minute"
          :is-enabled="isWithinRange(hour, minute)"
          :timehuman="timeHuman(hour, minute)"
        />
      </div>
    </div>
    <div class="fieldwork-day__date">
      {{ dateHuman }}
    </div>
  </div>
</template>

<script>
import scheduleSlot from "./schedule-slot";

export default {
  components: { scheduleSlot },

  props: {
    date: {
      type: [String, Date],
      default() {
        return new Date();
      }
    },

    range: {
      type: Object,
      default() {
        return {
          startHour: 0,
          startMinute: 0,
          endHour: 24,
          endMinute: 0
        };
      }
    }
  },

  computed: {
    isDragging() {
      return this.$store.getters["schedule/isDragging"];
    },

    hourHeightStyles() {
      return this.$store.getters["schedule/hourHeightStyles"];
    },

    scheduleHours() {
      return this.$store.getters["schedule/hoursArray"];
    },

    slotsOccupiedCount() {
      return (
        this.$store.getters["schedule/sessionLengthMinutes"] /
        this.$store.getters["schedule/precisionMinutes"]
      );
    },

    intervals() {
      let intervals = [];

      let step = 0;
      while (step < 60) {
        intervals.push(step);
        step = step + this.$store.getters["schedule/precisionMinutes"];
      }
      return intervals;
    },

    dateHuman() {
      let date = new Date(this.date);
      return new Intl.DateTimeFormat("nl", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }).format(date);
    }
  },

  watch: {
    isDragging(val) {
      if (!val) this.fixOverlapping();
    }
  },

  mounted() {
    Event.$on("fixOverlapping", this.fixOverlapping);
  },

  methods: {
    // convert int Hour and int Minute to eg.. "12:15" or "09:05"
    timeHuman(hour, minute) {
      while (String(hour).length < 2) {
        hour = "0" + hour;
      }
      while (String(minute).length < 2) {
        minute = "0" + minute;
      }
      return `${hour}:${minute}`;
    },

    isWithinRange(hour, minute) {
      hour = parseInt(hour);
      if (hour < this.range.startHour || hour > this.range.endHour)
        return false;
      else if (
        hour === this.range.startHour &&
        minute < this.range.startMinute
      )
        return false;
      else if (
        hour === this.range.endHour &&
        minute >= this.range.endMinute
      )
        return false;
      return true;
    },

    dateToId(hour, minute) {
      let date = new Date(this.date);
      date.setHours(hour, minute, 0);
      return date.getTime();
    },

    fixOverlapping() {
      let stepCount = this.slotsOccupiedCount - 1;
      let overlappingElements = [];

      this.$el.querySelectorAll(".slot.dropzone").forEach(slot => {
        if (slot.children.length) {
          //if schedule slot has any items
          overlappingElements.push(...slot.children); //store items
          stepCount = this.slotsOccupiedCount - 1;
        } else if (!stepCount) {
          this.divideWidth(overlappingElements);
          overlappingElements = [];
          stepCount = this.slotsOccupiedCount - 1;
        }
        stepCount--;
      });
    },

    divideWidth(elements) {
      let width = 100 / elements.length;
      elements.forEach(el => {
        el.style.width = width + "%";
        el.style.marginLeft = elements.indexOf(el) * width + "%";
      });
    }
  }
};
</script>

<style lang="scss">
@mixin force-height($values) {
	min-height: $values;
	height: $values;
	max-height: $values;
}

.fieldwork-day {
	height: 100%;
	min-width: 20rem;
	max-width: 30rem;
	padding: 0;
	&__date {
		color: #727575;
		position: sticky;
		top: 0;
		padding-top: 1rem;
		text-transform: lowercase;
		z-index: 20;
		background-image: linear-gradient(
			to bottom,
			rgba(248, 248, 248, 1),
			rgba(248, 248, 248, 0.7)
		);
		@include force-height(3rem);
	}
	&__times {
		&__hour {
			width: 100%;
			padding-right: 2rem;
			border-top: 1px solid #d0d1d1;
			display: flex;
			flex-direction: column;
			align-items: stretch;
		}
	}
}
</style>
