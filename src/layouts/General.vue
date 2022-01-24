<template>
  <fragment>
    <app-bar-component @toggleDrawer="toggleDrawerHandler" />
    <sidebar-component v-model="isShowDrawer" />
    <v-main class="accent">
      <v-container>
        <v-row>
          <v-col cols="12">
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';

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
