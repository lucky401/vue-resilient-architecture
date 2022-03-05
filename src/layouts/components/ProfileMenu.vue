<template>
  <v-menu
    left
    bottom
    rounded
    offset-y
    min-width="200px"
    :nudge-width="200"
    close-on-content-click
  >
    <template v-slot:activator="{ on: vMenu, attrs }">
      <v-tooltip :nudge-left="20" bottom left transition="scroll-y-transition">
        <template v-slot:activator="{ on: tooltip }">
          <v-btn
            icon
            v-bind="attrs"
            :large="isBreakpointXS"
            v-on="{ ...tooltip, ...vMenu }"
          >
            <v-avatar color="primary" :size="isBreakpointXS ? 32 : 38">
              <v-img
                :src="
                  profile.avatar || 'https://cdn.vuetifyjs.com/images/john.jpg'
                "
                :alt="profile.name"
              />
            </v-avatar>
          </v-btn>
        </template>
        <span> {{ profile.name }} </span>
      </v-tooltip>
    </template>
    <v-card outlined>
      <v-list flat>
        <v-list-item>
          <v-list-item-avatar color="primary">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title> {{ profile.name }} </v-list-item-title>
            <v-list-item-subtitle> {{ profile.role }} </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list flat dense class="py-0">
        <v-list-item-group color="primary">
          <v-list-item color="primary" exact :to="{ name: 'account-profile' }">
            <v-list-item-icon>
              <v-icon>mdi-account-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>My Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item color="primary" exact :to="{ name: 'account-password' }">
            <v-list-item-icon>
              <v-icon>mdi-lock-alert-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Change Password</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-divider />
      <v-list flat dense class="py-0">
        <v-list-item-group color="primary">
          <v-list-item color="primary" @click="logoutHandler">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import VuexModule from '@/utils/vuex';

import * as ROOTTYPES from '@/store-namespace/root/types';
import * as AUTHENTICATIONTYPES from '@/store-namespace/authentication/types';

const rootModule = VuexModule(ROOTTYPES.MODULE_NAME);
const authenticationModule = VuexModule(AUTHENTICATIONTYPES.MODULE_NAME);

export default {
  computed: {
    isBreakpointXS() {
      return this.$vuetify.breakpoint.name === 'xs';
    },

    ...rootModule.mapState({
      errorMessage: (state) =>
        state.errorMessage[AUTHENTICATIONTYPES.FETCH_LOGOUT],
    }),

    ...authenticationModule.mapState({
      authStatus: (state) => state.status.auth,
    }),

    ...authenticationModule.mapGetters({
      profile: AUTHENTICATIONTYPES.GET_USER_DATA,
    }),
  },

  methods: {
    ...authenticationModule.mapActions({
      fetchLogout: AUTHENTICATIONTYPES.FETCH_LOGOUT,
    }),

    async logoutHandler() {
      try {
        await this.fetchLogout();
        this.$router.push({ name: 'login' });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    },
  },
};
</script>
