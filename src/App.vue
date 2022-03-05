<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import VuexModule from '@/utils/vuex';

import * as AUTHENTICATIONTYPES from '@/store-namespace/authentication/types';

const authenticationModule = VuexModule(AUTHENTICATIONTYPES.MODULE_NAME);

export default {
  name: 'App',

  computed: {
    ...authenticationModule.mapGetters({
      isAuthenticated: AUTHENTICATIONTYPES.GET_IS_AUTHENTICATED,
    }),
  },

  mounted() {
    if (this.isAuthenticated) {
      this.loadUserHandler();
    }
  },

  methods: {
    ...authenticationModule.mapActions({
      fetchUser: AUTHENTICATIONTYPES.FETCH_USER,
    }),

    loadUserHandler() {
      this.fetchUser();
    },
  },
};
</script>
