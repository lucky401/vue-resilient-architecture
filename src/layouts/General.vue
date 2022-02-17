<template>
  <fragment>
    <app-bar-component @toggleDrawer="toggleDrawerHandler" />
    <sidebar-component v-model="isShowDrawer" />
    <v-main class="accent">
      <router-view />
    </v-main>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-frag';

import AppBarComponent from './components/AppBar';
import SidebarComponent from './components/Sidebar';

export default {
  components: {
    Fragment,
    AppBarComponent,
    SidebarComponent,
  },

  data() {
    return {
      isShowDrawer: false,
    };
  },

  methods: {
    toggleDrawerHandler() {
      this.isShowDrawer = !this.isShowDrawer;
    },
  },
};
</script>
