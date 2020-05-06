import Api from "./../../assets/js/api";

// state
const state = {
    fieldworkDays: [
        {
            id: 4954,
            project_id: 5363,
            deal_expense_id: 3588,
            datum: "2020-01-08T00:00:00+01:00",
            starttijd: "10:00:00",
            eindtijd: "16:00:00",
            n: 7,
            claimed_on: "2019-12-04T09:52:06+01:00",
            status: 1,
            gcal_event_id: "r0r31uoj34tpmrkkhe8ogg03ug",
            created: "2019-12-04T10:52:06+01:00",
            modified: "2020-01-28T23:06:24+01:00",
        },
        {
            id: 4950,
            project_id: 5363,
            deal_expense_id: 3653,
            datum: "2020-01-20T00:00:00+01:00",
            starttijd: "09:30:00",
            eindtijd: "18:00:00",
            n: 0,
            claimed_on: "2019-12-03T12:18:29+01:00",
            status: 1,
            gcal_event_id: "ffk5nqoda5jkntre82s5n9dvdo",
            created: "2019-12-03T13:18:30+01:00",
            modified: "2020-01-28T23:06:24+01:00",
        },

        {
            id: 4955,
            project_id: 5363,
            deal_expense_id: null,
            datum: "2020-01-28T00:00:00+01:00",
            starttijd: "09:00:00",
            eindtijd: "18:00:00",
            n: 0,
            claimed_on: "2019-12-05T09:13:33+01:00",
            status: 1,
            gcal_event_id: "9kgnuajql95vbui24tifpjpvrg",
            created: "2019-12-05T10:13:34+01:00",
            modified: "2020-01-28T23:06:24+01:00",
        },
        {
            id: 4953,
            project_id: 5363,
            deal_expense_id: null,
            datum: "2020-02-27T00:00:00+01:00",
            starttijd: "11:00:00",
            eindtijd: "18:00:00",
            n: 0,
            claimed_on: "2019-12-04T09:19:06+01:00",
            status: 1,
            gcal_event_id: "gii41iobi0mv89cqc0v2jeeukc",
            created: "2019-12-04T10:19:06+01:00",
            modified: "2020-01-28T23:06:24+01:00",
        },
    ],
};

// getters
const getters = {
    fieldworkDays(state) {
        return state.fieldworkDays;
    },
};

// actions
const actions = {
    fetchFieldworkDays({ commit }, projectId) {
        let url = `/api/v1/veldwerkdagen/?project_id=${projectId}`;

        return Api.get(url).then((json) => {
            commit("setFieldworkDays", json.data);
        });
    },
};

// mutations
const mutations = {
    setFieldworkDays(state, fieldworkDays) {
        state.fieldworkDays = fieldworkDays;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
