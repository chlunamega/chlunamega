<script>
import EventHub from '../EventHub'

export default {
  name: 'TheMenu',
  data() {
    const works = (sub) => `/works/${sub}`
    return {
      worksMenuIsOpen: false,
      worksMenu: [
        {
          name: 'Compositions',
          link: works('compositions'),
        },
        {
          name: 'Analysis',
          link: works('analysis'),
        },
        {
          name: 'Field Recordings',
          link: works('field-recordings'),
        },
        {
          name: 'Improvisation',
          link: works('improvisation-performance'),
        },
      ],
    }
  },
  computed: {
    worksItemIsSelected() {
      return this.$route.path.includes('works')
    },
  },
  mounted() {
    EventHub.$on('body-hover', () => {
      this.closeMenu()
    })
    EventHub.$on('body-click', () => {
      this.closeMenu()
    })
  },
  methods: {
    bodyClick() {
      EventHub.$emit('body-click')
    },
    bodyHover() {
      EventHub.$emit('body-hover')
    },
    openMenu() {
      this.worksMenuIsOpen = true
    },
    closeMenu() {
      this.worksMenuIsOpen = false
    },
  },
}
</script>

<template lang="pug">
#app(
  @mouseover='bodyHover'
  @click='bodyHover'
  )
  #nav-desktop
    nuxt-link.home-link(to="/") Christopher Luna-Mega
    div.main-nav
      nuxt-link(to="/about") About
      |  | 
      span(
        @mouseover.stop='openMenu'
        @click.stop=''
        )
        nuxt-link.relative(
          to="/works"
          :class='worksItemIsSelected ? "selected" : ""'
          ) Works
          div.submenu(v-if='worksMenuIsOpen' @click.prevent.stop='')
            p(v-for='sub in worksMenu')
              nuxt-link(:to='sub.link') {{sub.name}}
          
      |  | 
      nuxt-link(to="/news") News
</template>

<style lang="scss">
@import './scss/colors.scss';
@import './scss/mixins.scss';
.submenu {
  @include under(600px) {
    display: none;
  }
  @include center('x');
  top: 20px;
  z-index: 99;
  background-color: rgba(220, 220, 220, 0.8);
  padding: 10px 10px;
  p {
    font-size: 14px;
  }
  p:last-child {
    margin-bottom: 0;
  }

  a {
    width: 100%;
    display: block;
  }
}

.home-link {
  font-weight: normal;
  font-size: 18px;
  letter-spacing: 2px;
  &.router-link-exact-active {
    color: $main;
  }
}
</style>
