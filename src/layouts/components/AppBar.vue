<template>
  <fragment>
    <v-app-bar app color="#fff" outlined fixed flat extension-height="90">
      <v-row no-gutters>
        <v-col cols="12" class="d-flex align-center">
          <v-app-bar-nav-icon v-if="isMobile" @click="toggleDrawerHandler" />
          <v-img
            v-if="isMobile"
            contain
            max-width="30"
            max-height="30"
            :src="require('@/assets/logo.svg')"
            class="mr-4"
          />
          <v-spacer />
          <v-btn icon>
            <v-icon color="secondary">mdi-bell-outline</v-icon>
          </v-btn>
          <profile-menu-component />
        </v-col>
      </v-row>
      <template v-slot:extension v-if="hasAppBarExtension">
        <v-row no-gutters>
          <v-col cols="12">
            <portal-target name="app-bar-extension" />
          </v-col>
        </v-row>
      </template>
    </v-app-bar>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-frag';

import VuexModule from '@/utils/vuex';

import * as ROOTTYPES from '@/store-namespace/root/types';

const rootModule = VuexModule(ROOTTYPES.MODULE_NAME);

import ProfileMenuComponent from './ProfileMenu';

export default {
  components: {
    Fragment,
    ProfileMenuComponent,
  },

  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },

    ...rootModule.mapState({
      hasAppBarExtension: (state) => state.hasAppBarExtension,
    }),
  },

  methods: {
    toggleDrawerHandler() {
      this.$emit('toggleDrawer');
    },
  },
};
</script>

<style lang="scss">
.v-app-bar {
  border-bottom: 2px solid #eee !important;
}
.v-toolbar__content {
  border-bottom: 2px solid #eee !important;
}
</style>
