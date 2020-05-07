
import TheAboutMe from "./components/tomsamwel/the-about-me.vue";
import TheContact from "./components/tomsamwel/the-contact.vue";
import TheProjects from "./components/tomsamwel/the-projects.vue";

import ThePlanner from "./components/planner/the-planner.vue";

const routes = [

    { path: "/", component: TheAboutMe },
    { path: "/contact", component: TheContact },
    { path: "/work", component: TheProjects },
    { path: "/planner", component: ThePlanner },
    { path: '*', redirect: '/' }
];

export default routes;
