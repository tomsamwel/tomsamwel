<script>
export default {
  name: "TheProjects",
  data() {
    return {
      projects: [
        {
          title: "The Planner",
          focus: false,
          subtitle: "A Vue + Vuex tool to easily schedule clients",
          img: require("./../../assets/img/planner.png"),
          gif: require("./../../assets/img/planner.gif"),
          alt: "planner",
          demo: "/planner",
          github: "https://github.com/tomsamwel",
          description:
            "During my internship at Valsplat I was asked to develop a new & improved tool to make scheduling their clients easier. Thus this became my first large Vue app. \n Shortly after starting the project I implemented Vuex for improved state management and communication with the api."
        },
        {
          title: "Livestream",
          focus: false,
          subtitle: "All inclusive Livestream with chat and schedule",
          img: require("./../../assets/img/test.jpg"),
          gif: "",
          alt: "livestream",
          demo: "",
          github: "",
          description:
            "During my internship at Valsplat I was asked to develop a new & improved tool to make scheduling their clients easier. Thus this became my first large Vue app. Within a short period after starting the project I included Vuex for improved state management and communication with the api."
        }
      ]
    };
  },
  methods: {
    goto() {
      console.log("click");
    }
  }
};
</script>

<template>
  <md-app md-waterfall>
    <md-app-toolbar class="md-transparent">
      <span class="md-title" />
    </md-app-toolbar>
    <md-app-content>
      <div class="md-gutter md-layout">
        <div
          v-for="project in projects"
          :key="project.index"
          class="md-large-size-50 md-layout-item md-medium-size-50 md-small-size-100 md-xlarge-size-50 md-xsmall-size-100"
          @mouseenter="project.focus = true"
          @mouseleave="project.focus = false"
        >
          <md-card :md-with-hover="project.gif ? true : false">
            <md-card-media>
              <md-ripple>
                <transition name="fade">
                  <img
                    v-show="!project.focus || !project.gif"
                    :src="project.img"
                    :alt="project.alt"
                  >
                </transition>
                <transition name="fade">
                  <img
                    v-show="project.focus && project.gif"
                    :src="project.gif"
                    :alt="project.alt"
                  >
                </transition>
              </md-ripple>
            </md-card-media>

            <md-card-header>
              <div class="md-title">
                {{ project.title }}
              </div>
              <div class="md-subhead">
                {{ project.subtitle }}
              </div>
            </md-card-header>

            <md-card-expand v-if="project.demo || project.github">
              <md-card-actions md-alignment="space-between">
                <div>
                  <md-button
                    v-if="project.demo"
                    :to="project.demo"
                    class="md-primary"
                  >
                    Demo
                  </md-button>

                  <md-button
                    v-if="project.github"
                    :href="project.github"
                    :disabled="project.github ? false : true"
                    target="_blank"
                  >
                    GitHub
                  </md-button>
                </div>
                <md-card-expand-trigger>
                  <md-button class="md-icon-button">
                    <md-icon>keyboard_arrow_down</md-icon>
                  </md-button>
                </md-card-expand-trigger>
              </md-card-actions>

              <md-card-expand-content>
                <md-card-content>{{ project.description }}</md-card-content>
              </md-card-expand-content>
            </md-card-expand>

            <md-card-content v-else>
              {{ project.description }}
            </md-card-content>
          </md-card>
        </div>
      </div>
    </md-app-content>
  </md-app>
</template>


<style lang="sass" scoped>
.md-app
  height: 100vh
  max-height: 100vh

.md-content
	// background-color: #cdcdcd !important

.md-layout-item
  margin-bottom: 2rem
</style>