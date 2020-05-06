import Vue from "vue";
import Vuex from "vuex";

// modules
import schedule from "./modules/schedule";
import project from "./modules/project";
import fieldworkDays from "./modules/fieldwork-days";
import participants from "./modules/participants";
import notes from "./modules/notes";

// load vuex
Vue.use(Vuex);

// create store
export default new Vuex.Store({
    modules: {
        schedule,
        project,
        fieldworkDays,
        participants,
        notes,
    },
});
