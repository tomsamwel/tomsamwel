// state
const state = {
    userId: 1,
    draggedElementId: 0,
    isDragging: false,
    precisionMinutes: 5,
    sessionLengthMinutes: 60,
    sessionHeightRem: 6,
    hourHeightRem: 6,
    slotHeightRem: 0.5,
    range: { start: 9, end: 19 },
};

// getters
const getters = {
    userId(state) {
        return state.userId;
    },

    draggedElementId(state) {
        return state.draggedElementId;
    },

    isDragging(state) {
        return state.isDragging;
    },

    precisionMinutes(state) {
        return state.precisionMinutes;
    },

    sessionLengthMinutes(state) {
        return state.sessionLengthMinutes;
    },

    hoursArray(state) {
        let hours = [];
        for (let hour = state.range.start; hour < state.range.end; hour++) {
            hours.push(hour);
        }
        return hours;
    },

    hourHeightStyles(state) {
        return {
            height: state.hourHeightRem + "rem",
            minHeight: state.hourHeightRem + "rem",
            maxHeight: state.hourHeightRem + "rem",
        };
    },

    sessionHeightStyles(state) {
        return {
            height: state.sessionHeightRem + "rem",
            minHeight: state.sessionHeightRem + "rem",
            maxHeight: state.sessionHeightRem + "rem",
        };
    },

    slotHeightStyles(state) {
        return {
            height: state.slotHeightRem + "rem",
            minHeight: state.slotHeightRem + "rem",
            maxHeight: state.slotHeightRem + "rem",
        };
    },
};

// actions
const actions = {
    setUserId({ commit }, userId) {
        return commit("setUserId", userId);
    },

    setDraggedElementId({ commit }, id) {
        return commit("setDraggedElementId", id);
    },

    setIsDragging({ commit }, boolean) {
        return commit("setIsDragging", boolean);
    },

    setPrecisionMinutes({ commit }, minutes) {
        return commit("setPrecisionMinutes", minutes);
    },

    setScheduleRange({ commit }, range) {
        return commit("setScheduleRange", range);
    },

    setSessionLengthMinutes({ commit, dispatch, state }, length) {
        commit("setSessionLengthMinutes", length);
        dispatch("setScheduleHeight", state.hourHeightRem);
    },

    setScheduleHeight({ commit, state }, height) {
        commit(
            "setSessionHeightRem",
            (state.sessionLengthMinutes / 60) * height
        );
        commit("setHourHeightRem", height);
        commit("setSlotHeightRem", height / (60 / state.precisionMinutes));
    },

    increaseScheduleHeight({ dispatch, state }) {
        return dispatch("setScheduleHeight", state.hourHeightRem + 0.6);
    },

    decreaseScheduleHeight({ dispatch, state }) {
        return dispatch("setScheduleHeight", state.hourHeightRem - 0.6);
    },
};

// mutations
const mutations = {
    setUserId(state, userId) {
        state.userId = userId;
    },

    setDraggedElementId(state, id) {
        state.draggedElementId = id;
    },

    setIsDragging(state, boolean) {
        state.isDragging = boolean;
    },

    setPrecisionMinutes(state, minutes) {
        state.precisionMinutes = minutes;
    },

    setScheduleRange(state, range) {
        state.range = range;
    },

    setSessionLengthMinutes(state, length) {
        state.sessionLengthMinutes = length;
    },

    setSessionHeightRem(state, height) {
        state.sessionHeightRem = height;
    },

    setHourHeightRem(state, height) {
        state.hourHeightRem = height;
    },

    setSlotHeightRem(state, height) {
        state.slotHeightRem = height;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
