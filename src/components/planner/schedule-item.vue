<template>
  <div
    :id="id"
    class="draggable schedule-item"
    :class="{selected: isSelected, dragged: isDragged}"
    :style="sessionHeightStyles"
    draggable="true"
    @click="click"
    @dragstart="dragstart"
    @dragend.prevent="dragend"
    @dragenter.prevent
    @dragover.prevent
    @drop.prevent
  >
    <div
      ref="time"
      class="schedule-item__start-time"
    >
      <!-- eg 09:30 -->
    </div>

    <div class="schedule-item__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: [Number, String] },

    date: {
      type: [String, Date]
    },

    confirm: {
      type: [Boolean, Number]
    },

    confirmText: {
      type: String,
      default() {
        return "Are you sure?";
      }
    },

    availability: {
      type: Array,
      default() {
        return [
          { from: new Date(), to: new Date() },

          { from: new Date(), to: new Date() }
        ];
      }
    }
  },

  data() {
    return {
      isSelected: false,
      isDragged: false,
      availableScheduleSlots: []
    };
  },

  computed: {
    schedulePrecisionMinutes() {
      return this.$store.getters["schedule/precisionMinutes"];
    },

    sessionHeightStyles() {
      return this.$store.getters["schedule/sessionHeightStyles"];
    }
  },

  watch: {
    date() {
      this.scheduleSelf();
    },

    availability: {
      deep: true,
      immediate: true,
      handler() {
        this.getAvailableScheduleSlots();
      }
    }
  },

  mounted() {
    Event.$on("unselect", this.unselect);
    if (this.date) this.scheduleSelf();
  },

  methods: {
    dragstart(ev) {
      //remove dragged ghost image.. TODO : come up with a cleaner fix for this
      var img = new Image();
      img.src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
      ev.dataTransfer.setDragImage(
        img,
        window.outerWidth,
        window.outerHeight
      );

      //push the dragged participant's id to the store
      this.$store.dispatch("schedule/setDraggedElementId", this.id);

      //for some reason 1ms delay fixes a z-index issue here
      // TODO : figure this part out
      setTimeout(() => {
        this.$store.dispatch("schedule/setIsDragging", true);
      }, 1);
      this.isDragged = true;
    },

    dragend(ev) {
      if (this.confirm) {
        confirm(this.confirmText)
          ? this.schedule(ev)
          : this.scheduleSelf();
      } else {
        this.schedule(ev);
      }

      this.$store.dispatch("schedule/setIsDragging", false);
      this.isDragged = false;
    },

    click() {
      this.isSelected ? this.unselect() : this.select();
    },

    select() {
      Event.$emit("unselect");
      this.$emit("selected");
      this.availableScheduleSlots.length
        ? this.showAvailability()
        : this.getAvailableScheduleSlots();
      this.isSelected = true;
    },

    unselect() {
      this.$emit("unselected");
      this.hideAvailability();

      this.isSelected = false;
    },

    schedule(ev) {
      let newDate = ev.target.parentElement.id;
      // let sqlDate = new Date(parseInt(newDate)).toSQLString();
      this.$emit("scheduled", newDate);

      Event.$emit("scheduling");
    },

    scheduleSelf() {
      if (this.date) {
        let date = new Date(this.date);
        let slot = document.getElementById(date.getTime());
        if (slot && slot.classList.contains("dropzone")) {
          this.$refs.time.innerHTML = slot.dataset.timehuman;

          slot.appendChild(this.$el);
        }
      } else {
        document.querySelector(".schedule-items").appendChild(this.$el);
      }

      Event.$emit("fixOverlapping");
    },

    getAvailableScheduleSlots() {
      this.availability.forEach(availability => {
        // get each slot inbetween the from and to times
        // increment by 5 minutes (5 * 60 * 1000 )

        for (
          let slotId = availability.from;
          slotId < availability.to;
          slotId = slotId + this.schedulePrecisionMinutes * 60 * 1000
        ) {
          let slot = document.getElementById(slotId);
          if (slot) this.availableScheduleSlots.push(slot);
        }
      });
      this.showAvailability();
    },

    showAvailability() {
      this.availableScheduleSlots.forEach(slot => {
        slot.classList.add("available");
      });
    },

    hideAvailability() {
      if (!this.availableScheduleSlots.length) return;
      this.availableScheduleSlots.forEach(slot => {
        slot.classList.remove("available");
      });
    }
  }
};
</script>

<style lang="scss">
@mixin box-shadow($values) {
	box-shadow: $values;
	-webkit-box-shadow: $values;
	-moz-box-shadow: $values;
}

.schedule-item {
	@include box-shadow(0px 2px 4px 0px rgba(0, 0, 0, 0.5));
	width: 100%;
	overflow: hidden;
	cursor: grab;
	background-color: #fff;
	border-radius: 0.5rem;

	&__start-time {
		opacity: 0.7;
		color: grey;
		font-size: 80%;
		margin-right: 0.2rem;
		position: absolute;
		top: 0;
		left: 1rem;
	}
	&__content {
		width: 100%;
		height: 100%;
	}
}
.draggable.dragged {
	opacity: 0.6;
}
.schedule-item.selected {
	@include box-shadow(0px 0px 4px 4px rgb(106, 164, 250));
	z-index: 21;
}
</style>
