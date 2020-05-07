<template>
  <div
    v-if="participantId"
    v-show="isVisible"
    class="participant-details"
  >
    <!-- header section -->
    <div class="participant-details__header">
      <h2 class="participant-details__name">
        {{ name }}
      </h2>
      <span
        v-if="participant.status[1] !== 'blanco'"
        class="participant-details__status vds-badge vds-badge--yellow"
        :class="statusColorClass"
      >{{ participant.status[1] }}</span>
      <span class="participant-details__phone">{{ phone }}</span>
      <div
        class="participant-details__close"
        @click="close"
      >
        <i class="vds-icon vds-icon--clear" />
      </div>
    </div>

    <!-- actions section -->
    <div class="participant-actions">
      <div class="vds-button-group">
        <button
          id="message-popover-trigger"
          class="vds-button-group__button"
        >
          <i class="vds-icon vds-icon--blue vds-icon--email" />
          Bericht
        </button>

        <button class="vds-button-group__button">
          <i class="vds-icon vds-icon--blue vds-icon--textsms" />
          Notitie
        </button>

        <button
          id="status-popover-trigger"
          class="vds-button-group__button"
        >
          <i class="vds-icon vds-icon--blue vds-icon--textsms" />
          Status
        </button>

        <button
          id="remove-popover-trigger"
          class="vds-button-group__button"
        >
          <i class="vds-icon vds-icon--delete vds-icon--red" />
        </button>
      </div>
    </div>

    <AppPopover name="message-popover">
      <template #title>
        Een bericht naar {{ participant.participant.voornaam }} sturen
      </template>

      <template #content>
        <div
          v-if="!participant.messages || !participant.messages.length"
          class="message-option"
        >
          Nieuw bericht
        </div>
        <div
          v-else
          class="message-option"
        >
          Antwoorden op bericht
        </div>
        <div
          v-if="!participant.status_bevestigd"
          class="message-option"
        >
          Bevestiging sturen
        </div>
      </template>
    </AppPopover>

    <AppPopover name="status-popover">
      <template #title>
        {{ participant.participant.voornaam }}'s status updaten
      </template>

      <template #content>
        <div class="statusses vds-control">
          <label class="vds-label vds-label--required">
            <input
              type="checkbox"
              class="vds-checkbox vds-checkbox--large"
              :checked="participant.status_voicemail"
              @input="toggleVoicemailStatus"
            >
            Gebeld & Voicemail
          </label>

          <label class="vds-label vds-label--required">
            <input
              type="checkbox"
              class="vds-checkbox vds-checkbox--large"
              :checked="participant.status_gesproken"
              @input="toggleSpokenStatus"
            >
            Gesproken
          </label>

          <label class="vds-label vds-label--required">
            <input
              type="checkbox"
              class="vds-checkbox vds-checkbox--large"
              :checked="participant.status_bevestigd"
              @input="toggleConfirmedStatus"
            >
            Bevestigd
          </label>

          <label
            v-if="startsInLessThanAnHour"
            class="vds-label vds-label--required"
          >
            <input
              type="checkbox"
              class="vds-checkbox vds-checkbox--large"
              :checked="participant.status_show"
              @input="toggleShowStatus"
            >
            Show
          </label>
        </div>
      </template>
    </AppPopover>

    <AppPopover name="remove-popover">
      <template #title>
        {{ participant.participant.voornaam }} uit de planning halen
      </template>

      <template #content>
        <form class="remove-form">
          <div>
            <input
              id="canceled-input"
              type="checkbox"
              name="remove"
              :checked="participant.status_afgebeld"
            >
            <label
              class="remove-form__choice"
              for="canceled-input"
              @click="removeFromPlanningCanceled"
            >{{ participant.participant.voornaam }} heeft afgebeld</label>
          </div>
          <div>
            <input
              id="unsuitable-input"
              type="checkbox"
              name="remove"
            >
            <label
              class="remove-form__choice"
              for="unsuitable-input"
              @click="removeFromPlanningUnsuitable"
            >{{ participant.participant.voornaam }} is toch niet geschikt</label>
          </div>
          <div>
            <input
              id="noshow-input"
              type="checkbox"
              name="remove"
              :checked="participant.status_noshow"
            >
            <label
              class="remove-form__choice"
              for="noshow-input"
              @click="removeFromPlanningNoshow"
            >{{ participant.participant.voornaam }} is niet op komen dagen</label>
          </div>
        </form>
      </template>
    </AppPopover>

    <ParticipantNotes :participant-id="participant.id" />
    <!-- tabs section -->
    <div class="tabs-section">
      <!-- tabs navigation -->
      <div class="vds-tabs">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="vds-tabs__item"
          :class="{'vds-tabs__item--active': tab.active}"
          @click="selectTab(tab)"
        >
          <a>
            {{ tab.title }}
            <div
              v-if="unreadMessagesCount && tab.id === 2"
              class="vds-counter vds-counter--orange"
            >{{ unreadMessagesCount }}</div>
          </a>
        </div>
      </div>

      <!-- profile tab -->

      <div
        v-show="tabs[0].active"
        class="participant-details__tab profile-tab"
      >
        <ParticipantNotes
          v-if="participant.konijn_id"
          :konijn-id="participant.konijn_id"
        />
        <div
          v-if="participant.participant.geslacht || participant.participant.age"
          class="profile-tab__block"
        >
          <div class="profile-tab__block__title">
            Geslacht & Leeftijd
          </div>
          <div class="profile-tab__block__content">
            {{ sexHuman }},
            {{ ageHuman }}
          </div>
        </div>
        <div
          v-if="participant.participant.opleiding"
          class="profile-tab__block"
        >
          <div class="profile-tab__block__title">
            Opleiding
          </div>
          <div class="profile-tab__block__content">
            {{ participant.participant.opleiding }}
          </div>
        </div>
        <div
          v-if="participant.participant.city || participant.participant.woonplaats"
          class="profile-tab__block"
        >
          <div class="profile-tab__block__title">
            Woonplaats
          </div>
          <div
            v-if="participant.participant.city"
            class="profile-tab__block__content"
          >
            {{ participant.participant.city.name }}
            <span class="text text--sublte">
              {{ `(${this.participant.participant.city.administrative_area},
							${this.participant.participant.city.country})` }}
            </span>
          </div>
          <div
            v-else-if="participant.participant.woonplaats"
            class="profile-tab__block__content"
          >
            {{ participant.participant.woonplaats }}
          </div>
        </div>

        <a class="wide">Bekijk respondent pagina</a>
        <div class="vds-line vds-line--small wide" />

        <div class="profile-tab__block wide">
          <div class="profile-tab__block__title">
            Profiel
          </div>

          <AppInlineEdit
            :value="participant.profiel ? participant.profiel : 'Leeg'"
            @submit="patchProfile($event)"
          />
        </div>

        <div class="profile-tab__block wide">
          <div class="profile-tab__block__title">
            Achtergrond
          </div>

          <AppInlineEdit
            type="textarea"
            :value="participant.achtergrond"
            @submit="patchBackground($event)"
          >
            <template #trigger>
              <ul>
                <li
                  v-for="item of backgroundItems"
                  :key="item.index"
                >
                  {{ item }}
                </li>
              </ul>
            </template>
          </AppInlineEdit>
        </div>
        <ParticipantSurvey :participant-id="participantId" />
      </div>

      <!-- messages tab -->
      <div
        v-show="tabs[1].active"
        class="participant-details__tab"
      >
        <div v-if="!participant.messages || !participant.messages.length">
          Nog geen berichten
        </div>
        <ParticipantMessages :participant-id="participantId" />
      </div>

      <!-- compensation tab -->
      <div
        v-show="tabs[2].active"
        class="participant-details__tab"
      >
        <div class="vds-control">
          <label class="vds-label vds-label--required">Vergoeding</label>
          <input
            type="number"
            class="vds-input vds-input--l"
            :value="participant.get_vergoeding"
            @input="updateCompensation($event)"
          >
          <div class="vds-control__help">
            Std vergoeding voor dit project: €{{ projectCompensation }}
          </div>

          <label class="spare-toggle">
            <input
              type="checkbox"
              class="vds-checkbox vds-checkbox--large"
              :checked="participant.spare"
              @input="toggleSpareStatus"
            >
            {{ participant.participant.voornaam }} is een reserve respondent
          </label>
        </div>
        <div class="vds-line vds-line--small wide" />
        <ul
          v-if="participant.consent && participant.consent.id"
          class="consent-details"
        >
          <li>Bevestigd en akkoord gegaan met toestemmingsverklaring.</li>

          <li v-if="participant.consent.iban">
            Bankgegevens ingevuld {{ participant.consent.iban }}
          </li>

          <li
            v-if="participant.consent.payable_amount"
          >
            Incentive + reiskosten berekend: totaal € {{ participant.consent.payable_amount }}
          </li>

          <li
            v-if="participant.consent.paid_on"
          >
            Overgemaakt op {{ timeHuman(participant.consent.paid_on) }}
          </li>

          <li
            v-else-if="participant.consent.iban && !participant.consent.payment_status !== 99"
          >
            Nog niet overgemaakt
          </li>
          <li>
            <a
              target="_parent"
              :href="'https://recruit.valsplat.team/deelnameconsent/' + participant.consent.id"
            >Bekijk details</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AppPopover from "./../app-popover";
import AppInlineEdit from "./../app-inline-edit";
import ParticipantMessages from "./participant-messages";
import ParticipantNotes from "./participant-notes.vue";
import ParticipantSurvey from "./participant-survey.vue";

export default {
  components: {
    AppPopover,
    AppInlineEdit,
    ParticipantMessages,
    ParticipantNotes,
    ParticipantSurvey
  },

  data() {
    return {
      isVisible: false,
      participantId: 0,
      tabs: [
        { id: 1, active: true, title: "Profiel" },

        { id: 2, active: false, title: "Berichten" },

        { id: 3, active: false, title: "Vergoeding" }
      ]
    };
  },

  computed: {
    projectCompensation() {
      return this.$store.getters["project/compensation"];
    },

    participant() {
      return this.$store.getters["participants/participantById"](
        this.participantId
      );
    },

    participantUrl() {
      return (
        (this.participant.konijn_id ? "/r/" : "/dummy/") +
        this.participantId
      );
    },

    name() {
      return (
        this.participant.participant.name ??
        [
          this.participant.participant.voornaam,
          this.participant.participant.tussenvoegsel,
          this.participant.participant.achternaam
        ]
          .join(" ")
          .trim()
      );
    },

    phone() {
      return this.participant.participant.primary_phone_formatted
        ? this.participant.participant.primary_phone_formatted
        : "";
    },

    sexHuman() {
      switch (this.participant.participant.geslacht) {
      case "m":
        return "Man";
      case "v":
        return "Vrouw";
      default:
        return "Onbekend";
      }
    },

    ageHuman() {
      return `${this.participant.participant.age} jaar`;
    },

    backgroundItems() {
      return this.participant.achtergrond
        ? this.participant.achtergrond.replace(/- /g, "").split("\n")
        : [];
    },

    statusColorClass() {
      if (
        this.participant.status_noshow ||
        this.participant.status_afgebeld
      )
        return "vds-badge--red"; //rgba(235, 153, 153,.5)
      if (
        this.participant.status_show ||
        this.participant.status_bevestigd
      )
        return "vds-badge--green"; //  rgba(153, 235, 153,.8)
      if (this.participant.status_gemaild) return "vds-badge--green-80"; //rgba(200, 235, 153,.8)
      if (this.participant.status_gesproken) return "vds-badge--green-60"; // rgba(235, 235, 153,.8)
      if (this.participant.status_voicemail)
        return "vds-badge--orange-80";
      // rgba(235, 200, 153,.8)
      else return "vds-badge--orange-80";
    },

    startsInLessThanAnHour() {
      return new Date().addHours(1) > new Date(this.participant.datum);
    },

    unreadMessagesCount() {
      return this.$store.getters["participants/unreadMessageCountById"](
        this.participant.id
      );
    }
  },

  mounted() {
    Event.$on("openDetails", participantId => {
      this.open(participantId);
    });
    Event.$on("closeDetails", () => {
      if (this.isVisible) {
        this.isVisible = false;
      }
    });
  },

  methods: {
    timeHuman(timeString) {
      return new Intl.DateTimeFormat("default", {
        year: "numeric",
        month: "short",
        day: "numeric"
      }).format(new Date(timeString));
    },

    open(participantId) {
      if (this.participantId === participantId && this.isVisible) return; //already open on the requested participant

      this.participantId = participantId;

      this.isVisible = true;
    },

    close() {
      this.isVisible = false;
      Event.$emit("unselect");
    },

    selectTab(clickedTab) {
      this.tabs.forEach(tab => {
        tab.active = false;
      });
      clickedTab.active = true;
    },

    updateCompensation($event) {
      let compensation = Number($event.target.value);
      if (compensation) {
        this.patchParticipant({ vergoeding: compensation });
      } else $event.target.value = this.participant.get_vergoeding;
    },

    toggleSpareStatus() {
      //dispatch update participant with status
      this.patchParticipant({ spare: this.participant.spare ? 0 : 1 });
    },

    toggleVoicemailStatus() {
      if (this.participant.status_voicemail) {
        this.$store.dispatch(
          "participants/markAsNotVoicemail",
          this.participantId
        );
      } else {
        this.$store.dispatch(
          "participants/markAsVoicemail",
          this.participantId
        );
      }
    },

    toggleSpokenStatus() {
      if (this.participant.status_gesproken) {
        this.$store.dispatch(
          "participants/markAsNotSpoken",
          this.participantId
        );
      } else {
        this.$store.dispatch(
          "participants/markAsSpoken",
          this.participantId
        );
      }
    },

    toggleConfirmedStatus() {
      if (this.participant.status_bevestigd) {
        this.$store.dispatch(
          "participants/markAsNotConfirmed",
          this.participantId
        );
      } else {
        this.$store.dispatch(
          "participants/markAsConfirmed",
          this.participantId
        );
      }
    },

    toggleShowStatus() {
      if (this.participant.status_show) {
        this.$store.dispatch(
          "participants/markAsNotShow",
          this.participantId
        );
      } else {
        this.$store.dispatch(
          "participants/markAsShow",
          this.participantId
        );
      }
    },

    removeFromPlanningCanceled() {
      this.$store.dispatch(
        "participants/removeFromPlanningCanceled",
        this.participant.id
      );
    },

    removeFromPlanningUnsuitable() {
      this.$store.dispatch(
        "participants/removeFromPlanningUnsuitable",
        this.participant.id
      );
    },

    removeFromPlanningNoshow() {
      this.$store.dispatch(
        "participants/removeFromPlanningNoshow",
        this.participant.id
      );
    },

    newNote() {
      Event.$emit("newNote", this.participantId);
    },

    newMessage() {
      Event.$emit("newMessage", this.participantId);
    },

    newReply() {
      // get the last message
      let lastMessage = this.participant.messages[
        this.participant.messages.length - 1
      ];
      // Open a new reply form using the last message's ID
      Event.$emit("newReply", {
        participantId: this.participantId,
        messageId: lastMessage.id
      });
    },

    newConfirmation() {
      Event.$emit("newConfirmation", this.participantId);
    },

    patchProfile(newValue) {
      this.patchParticipant({
        profiel: newValue
      });
    },

    patchBackground(newValue) {
      this.patchParticipant({
        achtergrond: newValue
      });
    },

    patchParticipant(fields) {
      this.$store.dispatch("participants/patchParticipant", {
        participantId: this.participant.id,
        fields: fields
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

.participant-details {
	background-color: #fff;
	z-index: 50;
	position: fixed;
	width: 26.5rem;
	right: 0;
	top: 12.5rem;
	bottom: 0;
	overflow: scroll;
	padding: 1rem;
	@include box-shadow(0px 2px 4px 0px rgba(0, 0, 0, 0.5));
	margin: 0;
	display: flex;
	flex-direction: column;

	&__header {
		margin-bottom: 1rem;
	}
	&__name {
		margin-bottom: 0.5rem;
	}
	&__status {
		margin-right: 1rem;
	}
	&__phone {
		color: grey;
	}
	&__close {
		cursor: pointer;
		padding: 1rem;
		position: absolute;
		top: 0;
		right: 0;
	}

	.participant-actions {
		margin-bottom: 1rem;
	}
	.message-option {
		color: #1572ea;
		padding: 1rem;
		cursor: pointer;
		transition: 300ms;
		&:hover {
			background-color: #cfe3fb;
			-webkit-box-shadow: inset 8px 0px 0px 0px rgba(21, 114, 234, 1);
			-moz-box-shadow: inset 8px 0px 0px 0px rgba(21, 114, 234, 1);
			box-shadow: inset 8px 0px 0px 0px rgba(21, 114, 234, 1);
		}
	}
	.statusses {
		padding: 1rem;
	}
	.remove-form {
		display: flex;
		flex-direction: column;

		input[type="checkbox"] {
			opacity: 0;
			position: absolute;
		}
		&__choice {
			display: block;
			color: #1572ea;
			padding: 1rem;
			cursor: pointer;
			transition: 300ms;
		}
		&__choice:hover,
		input[type="checkbox"]:checked ~ .remove-form__choice {
			background-color: #cfe3fb;
			-webkit-box-shadow: inset 8px 0px 0px 0px rgba(21, 114, 234, 1);
			-moz-box-shadow: inset 8px 0px 0px 0px rgba(21, 114, 234, 1);
			box-shadow: inset 8px 0px 0px 0px rgba(21, 114, 234, 1);
		}
	}
	.tabs-section {
		.vds-tabs__item a {
			cursor: pointer;
		}
		.profile-tab {
			display: flex;
			flex-wrap: wrap;

			&__block {
				width: 50%;
				margin-bottom: 1rem;
				&__title {
					font-weight: 600;
					color: #a1a3a3;
				}
				&__content {
				}
			}

			.wide {
				width: 100%;
			}
		}
		.spare-toggle {
			margin-top: 1.5rem;
			padding: 0.2rem 0;
			cursor: pointer;
			input {
				margin-top: 1rem;
			}
		}
	}
}
</style>
