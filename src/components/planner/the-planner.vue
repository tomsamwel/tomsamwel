<template>
  <div class="planner">
    <div class="planner-header">
      <h1 class="planner-header__title">
        Planning
      </h1>
      <button
        :disabled="!unscheduledParticipants.length"
        class="vds-button vds-button--secondary"
        @click="scheduleItemsListVisible = !scheduleItemsListVisible"
      >
        {{ unscheduledParticipants.length ? "Respondent toevoegen" : "Alle respondenten zijn ingepland" }}
      </button>
    </div>

    <TheSchedule :schedule-items-list-visible="scheduleItemsListVisible">
      <template #scheduleItems>
        <ScheduleItem
          v-for="participant in participants"
          :id="participant.id"
          :key="participant.id"
          :date="participant.datum"
          :confirm="participant.status_bevestigd"
          :confirm-text="`${participant.participant.name ? participant.participant.name : participant.participant.voornaam} heeft al bevestigd. Als je doorgaat, moet je ${participant.participant.name ? participant.participant.name : participant.participant.voornaam} de nieuwe tijd wel doorgeven. Wil je doorgaan?`"
          :availability="participant.parsedAvailability"
          @selected="onParticipantSelect(participant.id)"
          @unselected="onParticipantUnselect(participant.id)"
          @scheduled="scheduleParticipant(participant.id, $event)"
        >
          <ParticipantThumbnail :participant-id="participant.id" />
        </ScheduleItem>
      </template>
      <template #scheduleDays>
        <ScheduleDay
          v-for="fieldworkDay of fieldworkDays"
          :key="fieldworkDay.id"
          :fieldwork-day="fieldworkDay"
          :date="fieldworkDay.datum"
          :range="fieldworkDayRange(fieldworkDay)"
        />
      </template>
    </TheSchedule>

    <ParticipantDetails />

    <AppModal name="NoteModal">
      <ParticipantNoteForm modal="NoteModal" />
    </AppModal>
    <AppModal name="MessageModal">
      <ParticipantMessageForm modal="MessageModal" />
    </AppModal>
  </div>
</template>

<script>
import AppModal from "./../app-modal";
import TheSchedule from "./the-schedule";
import ScheduleDay from "./schedule-day";
import ScheduleItem from "./schedule-item";
import ParticipantThumbnail from "./participant-thumbnail";
import ParticipantDetails from "./participant-details";
import ParticipantNoteForm from "./participant-note-form";
import ParticipantMessageForm from "./participant-message-form";

export default {
  components: {
    AppModal,
    TheSchedule,
    ScheduleDay,
    ScheduleItem,
    ParticipantDetails,
    ParticipantNoteForm,
    ParticipantMessageForm,
    ParticipantThumbnail
  },

  data() {
    return {
      scheduleItemsListVisible: false
    };
  },

  computed: {
    participants() {
      return this.$store.getters["participants/participants"];
    },

    unscheduledParticipants() {
      return this.$store.getters["participants/unscheduledParticipants"];
    },

    fieldworkDays() {
      return this.$store.getters["fieldworkDays/fieldworkDays"];
    },

    // compute the earlier fieldwork day start time to generate the schedule (eg. 9:55 becomes 9)
    scheduleStart() {
      if (this.fieldworkDays.length > 1) {
        return parseInt(
          this.fieldworkDays
            .reduce((previousTime, fieldworkDay) => {
              return previousTime < fieldworkDay.starttijd
                ? previousTime
                : fieldworkDay.starttijd;
            }, this.fieldworkDays[0].starttijd)
            .slice(0, 2)
        );
      }
      if (this.fieldworkDays.length === 1) {
        return parseInt(this.fieldworkDays[0].starttijd.slice(0, 2));
      } else return 0;
    },

    // compute the latest fieldwork day end time to generate the schedule (eg. 17:55 becomes 17 + 1 so 18)
    scheduleEnd() {
      if (this.fieldworkDays.length > 1) {
        return parseInt(
          this.fieldworkDays
            .reduce((previousTime, fieldworkDay) => {
              return previousTime > fieldworkDay.eindtijd
                ? previousTime
                : fieldworkDay.eindtijd;
            }, this.fieldworkDays[0].eindtijd)
            .slice(0, 2)
        );
      }
      if (this.fieldworkDays.length === 1) {
        return parseInt(this.fieldworkDays[0].eindtijd.slice(0, 2)) + 1;
      } else return 24;
    },

    scheduleRange() {
      return {
        start: this.scheduleStart ?? 0,
        end: this.scheduleEnd ?? 0
      };
    }
  },

  watch: {
    scheduleRange: {
      deep: true,
      handler() {
        this.$store.dispatch(
          "schedule/setScheduleRange",
          this.scheduleRange
        );
      }
    }
  },

  beforeMount() {
    // let projectId = 5363;

    this.$store.dispatch("schedule/setUserId", 1);
    // this.$store.dispatch("project/fetchProject", projectId);
    // this.$store.dispatch("fieldworkDays/fetchFieldworkDays", projectId);
    // this.$store.dispatch("participants/fetchParticipants", projectId);
  },

  methods: {
    //Emits global event to toggle the partipant-list's visibility
    toggleParticipantsList() {
      Event.$emit("toggleParticipants");
    },

    onParticipantSelect(participantId) {
      this.$store.dispatch(
        "participants/fetchAvailability",
        participantId
      );
      Event.$emit("openDetails", participantId);
    },

    onParticipantUnselect(participantId) {
      return participantId;
    },

    scheduleParticipant(participantId, newDate) {
      this.$store.dispatch("participants/scheduleParticipant", {
        participantId: participantId,
        date: new Date(parseInt(newDate)).toSQLString()
      });
    },

    fieldworkDayRange(fieldworkDay) {
      return {
        startHour: parseInt(fieldworkDay.starttijd.slice(0, 2)),
        startMinute: parseInt(fieldworkDay.starttijd.slice(3, 5)),
        endHour: parseInt(fieldworkDay.eindtijd.slice(0, 2)),
        endMinute: parseInt(fieldworkDay.eindtijd.slice(3, 5))
      };
    }
  }
};
</script>

<style lang="scss" >
@import "./../../assets/css/app";

.planner {
	background: #f8f8f8;
}
.planner-header {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;

	&__title {
		font-weight: 400;
		margin-bottom: 0;
	}
}
</style>