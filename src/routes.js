import Home from "./components/home.vue";
import TheProjects from "./components/the-projects.vue";
import Planner from "./components/planner/the-planner.vue";
import Contact from "./components/contact.vue";

const routes = [
    { path: "/work", component: TheProjects },
    { path: "/about", component: Home },
    { path: "/contact", component: Contact },
    { path: "/planner", component: Planner },
];

export default routes;
