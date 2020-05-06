import Api from "./../../assets/js/api";

import Vue from "vue";

// state
const state = {
    notes: [
        {
            id: 1937,
            user_id: 1,
            deelname_id: 48480,
            konijn_id: null,
            notitie: "Goede kandidaat!",
            tijd: "2020-05-02T22:01:44+02:00",
            updated: "2020-05-02T22:01:44+02:00",
            user: {
                id: 1,
                email: "tom.samwel@valsplat.nl",
                name: "Gerben Knetemann",
                abbr: "",
                roles: null,
                archived: null,
                updated: null,
                created: "2020-03-13T16:15:59+01:00",
            },
        },
        {
            id: 1919,
            user_id: 1,
            deelname_id: 48459,
            konijn_id: null,
            notitie: "Past goed",
            tijd: "2020-04-28T14:45:04+02:00",
            updated: "2020-04-28T14:45:04+02:00",
            user: {
                id: 1,
                email: "tom.samwel@valsplat.nl",
                name: "Gerben Knetemann",
                abbr: "",
                roles: null,
                archived: null,
                updated: null,
                created: "2020-03-13T16:15:59+01:00",
            },
        },
        {
            id: 1904,
            user_id: 1,
            deelname_id: null,
            konijn_id: 9149,
            notitie: "Goede kandidaat!",
            tijd: "2020-04-28T20:11:56+02:00",
            updated: "2020-04-28T20:11:56+02:00",
            user: {
                id: 1,
                email: "tom.samwel@valsplat.nl",
                name: "Gerben Knetemann",
                abbr: "",
                roles: null,
                archived: null,
                updated: null,
                created: "2020-03-13T16:15:59+01:00",
            },
        },
        {
            id: 1931,
            user_id: 1,
            deelname_id: 48381,
            konijn_id: null,
            notitie: "Goede kandidaat!",
            tijd: "2020-04-28T20:42:30+02:00",
            updated: "2020-04-28T20:42:30+02:00",
            user: {
                id: 1,
                email: "tom.samwel@valsplat.nl",
                name: "Gerben Knetemann",
                abbr: "",
                roles: null,
                archived: null,
                updated: null,
                created: "2020-03-13T16:15:59+01:00",
            },
        },
        {
            id: 1917,
            user_id: 1,
            deelname_id: 48450,
            konijn_id: null,
            notitie: "Goede kandidaat!",
            tijd: "2020-04-28T20:44:19+02:00",
            updated: "2020-04-28T20:44:19+02:00",
            user: {
                id: 1,
                email: "tom.samwel@valsplat.nl",
                name: "Gerben Knetemann",
                abbr: "",
                roles: null,
                archived: null,
                updated: null,
                created: "2020-03-13T16:15:59+01:00",
            },
        },
        {
            id: 1936,
            user_id: 1,
            deelname_id: 48388,
            konijn_id: null,
            notitie: "Goede kandidaat!",
            tijd: "2020-05-01T18:50:45+02:00",
            updated: "2020-05-01T18:50:45+02:00",
            user: {
                id: 1,
                email: "tom.samwel@valsplat.nl",
                name: "Gerben Knetemann",
                abbr: "",
                roles: null,
                archived: null,
                updated: null,
                created: "2020-03-13T16:15:59+01:00",
            },
        },
        {
            id: 1934,
            user_id: 1,
            deelname_id: 48446,
            konijn_id: null,
            notitie: "Goede kandidaat!",
            tijd: "2020-05-01T14:56:43+02:00",
            updated: "2020-05-01T14:56:43+02:00",
            user: {
                id: 1,
                email: "tom.samwel@valsplat.nl",
                name: "Gerben Knetemann",
                abbr: "",
                roles: null,
                archived: null,
                updated: null,
                created: "2020-03-13T16:15:59+01:00",
            },
        },
        {
            id: 5000,
            user_id: 1,
            deelname_id: 48446,
            konijn_id: null,
            notitie: "Goede kandidaat!",
            tijd: "2020-05-01T14:56:43+02:00",
            updated: "2020-05-01T14:56:43+02:00",
            user: {
                id: 1,
                email: "tom.samwel@valsplat.nl",
                name: "Gerben Knetemann",
                abbr: "",
                roles: null,
                archived: null,
                updated: null,
                created: "2020-03-13T16:15:59+01:00",
            },
        },
    ],
};

// getters
const getters = {
    notes(state) {
        return state.notes;
    },

    noteById: (state) => (id) => {
        return state.notes.find((note) => note.id === id);
    },

    notesByParticipantId: (state) => (participantId) => {
        return state.notes.filter((note) => note.deelname_id === participantId);
    },

    notesByKonijnId: (state) => (konijnId) => {
        return state.notes.filter((note) => note.konijn_id === konijnId);
    },
};

// actions
const actions = {
    fetchNotesByParticipantId({ dispatch }, participantId) {
        let url = `/api/v1/notities/?deelname_id=${participantId}`;

        Api.get(url).then((json) => {
            dispatch("updateOrAddNotes", json.data);
        });
    },

    fetchNotesByKonijnId({ dispatch }, konijnId) {
        let url = `/api/v1/notities/?konijn_id=${konijnId}`;

        Api.get(url).then((json) => {
            dispatch("updateOrAddNotes", json.data);
        });
    },

    updateOrAddNotes({ commit, getters }, notes) {
        notes.forEach((note) => {
            if (getters["noteById"](note.id)) commit("updateNote", note);
            else commit("addNote", note);
        });
    },

    removeNoteById({ commit, getters }, noteId) {
        commit("removeNote", getters["noteById"](noteId));
    },
};

// mutations
const mutations = {
    addNote(state, note) {
        state.notes.push(note);
    },

    updateNote(state, updatedNote) {
        let note = state.notes.find((note) => note.id === updatedNote.id);
        let index = state.notes.indexOf(note);
        Object.assign(note, updatedNote);
        Vue.set(state.notes, index, note);
    },

    removeNote(state, note) {
        let index = state.notes.indexOf(note);
        state.notes.splice(index, 1);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
