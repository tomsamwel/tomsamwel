import Api from "./../../assets/js/api";

// state
const state = {
    project: {
        compensation: 40,
    },
};

// getters
const getters = {
    project(state) {
        return state.project;
    },

    compensation(state) {
        return state.project.compensation;
    },
};

// actions
const actions = {
    fetchProject({ dispatch, commit }, projectId) {
        let url = `/api/v1/projects/${projectId}`;

        Api.get(url).then((json) => {
            dispatch(
                "schedule/setSessionLengthMinutes",
                json.data.session_length,
                { root: true }
            );
            commit("setProject", json.data);
        });
    },
};

// mutations
const mutations = {
    setProject(state, project) {
        state.project = project;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
