<template>
  <v-app-bar app color="accent" outlined fixed flat class="px-4">
    <v-app-bar-nav-icon v-if="isMobile" @click="toggleDrawerHandler" />
    <v-img
      v-if="isMobile"
      contain
      max-width="30"
      max-height="30"
      :src="require('@/assets/logo.svg')"
      class="mr-4"
    />
    <v-toolbar-title class="secondary--text text-capitalize">
      <span>
        {{ $route.meta.title }}
      </span>
    </v-toolbar-title>
    <v-spacer />
    <v-btn icon>
      <v-icon color="secondary">mdi-bell-outline</v-icon>
    </v-btn>
    <profile-menu-component />
  </v-app-bar>
</template>

<script>
import ProfileMenuComponent from './ProfileMenu';

export default {
  components: {
    ProfileMenuComponent,
  },

  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },

  methods: {
    toggleDrawerHandler() {
      this.$emit('toggleDrawer');
    },
  },
};
</script>

<style lang="scss" scoped>
.v-app-bar {
  border-bottom: 2px solid #eee !important;
}
</style>
