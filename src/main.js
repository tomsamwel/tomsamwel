import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import Index from "./components/tomsamwel/index.vue";

import routes from "./routes";

Vue.use(VueRouter);
const router = new VueRouter({ routes });


import {
    MdButton,
    MdContent,
    MdApp,
    MdToolbar,
    MdCard,
    MdRipple,
    MdIcon,
    MdTooltip,
} from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdApp);
Vue.use(MdCard);
Vue.use(MdRipple);
Vue.use(MdIcon);
Vue.use(MdToolbar);
Vue.use(MdTooltip);

Date.prototype.addHours = function(h) {
    this.setHours(this.getHours() + h);
    return this;
};

Date.prototype.toSQLString = function() {
    return (
        this.toISOString().split("T")[0] +
        " " +
        this.toTimeString().split(" ")[0]
    );
};

// easy global events
window.Event = new Vue();

new Vue({
    name: "Tomsamwel",
    router,
    store,
    render: (h) => h(Index),
}).$mount("#app");
