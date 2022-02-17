<template>
  <fragment>
    <v-img
      contain
      class="mx-auto mb-4"
      width="150"
      height="150"
      :src="require('@/assets/logo.svg')"
    />
    <h1 class="text-h4 accent--text font-weight-bold text-center my-1">
      SENTINEL
    </h1>
    <p class="body-2 mb-8 accent--text text-center">Admin Panel</p>
    <v-card width="90%" max-width="408" class="mx-auto" flat outlined>
      <v-card-text class="pt-4">
        <ValidationObserver ref="observer">
          <v-form :readonly="isLoading">
            <p class="body-2 mb-2 secondary--text">Email</p>
            <ValidationProvider
              name="Email"
              rules="required|email"
              v-slot="{ errors }"
            >
              <v-text-field
                :error-messages="errors"
                v-model="form.email"
                autofocus
                dense
                outlined
                color="info"
                placeholder="Email"
              >
              </v-text-field>
            </ValidationProvider>
            <p class="body-2 mb-2 secondary--text">Password</p>
            <ValidationProvider
              name="Password"
              rules="required|max:20"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="form.password"
                :error-messages="errors"
                dense
                outlined
                color="info"
                placeholder="Password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              >
              </v-text-field>
            </ValidationProvider>
          </v-form>
        </ValidationObserver>
        <div class="text-center mt-4 mb-4">
          <v-btn
            block
            elevation="0"
            color="secondary darken-2"
            :loading="isLoading"
            @click="loginHandler"
            rounded
          >
            Login
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-frag';

import VuexModule from '@/utils/vuex';

import * as AUTHENTICATIONTYPES from '@/store-namespace/authentication/types';

const authenticationModule = VuexModule(AUTHENTICATIONTYPES.MODULE_NAME);

export default {
  components: {
    Fragment,
  },

  data() {
    return {
      showPassword: false,
      form: {
        email: 'test@mail.com',
        password: '123456',
      },
      isLoading: false,
    };
  },

  methods: {
    ...authenticationModule.mapActions({
      fetchLogin: AUTHENTICATIONTYPES.FETCH_LOGIN,
    }),

    async loginHandler() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        try {
          await this.fetchLogin();
          this.$router.push({ name: 'home' });
        } catch (e) {
          return;
        }
      }
    },
  },
};
</script>
