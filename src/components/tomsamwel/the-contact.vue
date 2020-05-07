<script>
export default {
  name: "TheContact",
  data() {
    return {
      socials: [
        {
          title: "LinkedIn",
          link: "https://www.linkedin.com/in/tom-samwel-62330b151/",
          icon: "fa fa-linkedin"
        },
        {
          title: "GitHub",
          link: "https://github.com/tomsamwel",
          icon: "fa fa-github"
        },
        {
          title: "Facebook",
          link:
            "https://www.facebook.com/profile.php?id=100005337435218",
          icon: "fa fa-facebook-f"
        }
      ]
    };
  },
  methods: {
    goto(url) {
      setTimeout(() => {
        window.open(url, "_blank");
      }, 400);
    }
  }
};
</script>

<template>
  <md-ripple>
    <div class="socials">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      >

      <button
        v-for="(social, index) in socials"
        :key="index"
        class="bubble rainbow-glow"
        :class="'delay-' + index"
        type="button"
        @click="goto(social.link)"
      >
        <i :class="social.icon" />
        <md-tooltip md-direction="right">
          {{ social.title }}
        </md-tooltip>
      </button>
    </div>
  </md-ripple>
</template>



<style lang="scss" >
.socials {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	height: 100vh;
	width: 100%;
}
.rainbow-glow {
	width: 10rem;
	height: 10rem;
	font-size: 5rem;
	border: none;
	outline: none;
	color: #fff;
	background: #000;
	cursor: pointer;
	position: relative;
	z-index: 0;
	border-radius: 100%;
	transition: scale 0.3s ease-in-out;

	&:before {
		content: "";
		background: linear-gradient(
			45deg,
			#ff0000,
			#ff7300,
			#fffb00,
			#48ff00,
			#00ffd5,
			#002bff,
			#7a00ff,
			#ff00c8,
			#ff0000
		);
		border-radius: 100%;
		position: absolute;
		top: -2px;
		left: -2px;
		background-size: 400%;
		z-index: -1;
		filter: blur(5px);
		width: calc(100% + 4px);
		height: calc(100% + 4px);
		animation: glowing 20s infinite;
	}

	&:after {
		border: 0;
		z-index: -1;
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		background: #000;
		border-radius: 100%;
		left: 0;
		top: 0;
		opacity: 1;
		transition: 1s;
	}

	&:hover {
		scale: 1.1;

		&:before {
			border: 0;
		}

		&:after {
			opacity: 0;
		}
	}

	&:active {
		color: #000;
		scale: 4;
		z-index: 2;

		&:after {
			background: transparent;
		}
	}
}

@keyframes glowing {
	0% {
		background-position: 0 0;
	}
	50% {
		background-position: 400% 0;
	}
	100% {
		background-position: 0 0;
	}
}
</style>