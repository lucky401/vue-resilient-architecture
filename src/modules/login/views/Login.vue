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
          <v-form :readonly="authStatus === 'pending'">
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

        <error-alert-component :message="errorMessage" />

        <div class="text-center mt-4 mb-4">
          <v-btn
            block
            elevation="0"
            color="secondary darken-2"
            :loading="authStatus === 'pending'"
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

import * as ROOTTYPES from '@/store-namespace/root/types';
import * as AUTHENTICATIONTYPES from '@/store-namespace/authentication/types';

const rootModule = VuexModule(ROOTTYPES.MODULE_NAME);
const authenticationModule = VuexModule(AUTHENTICATIONTYPES.MODULE_NAME);

import ErrorAlertComponent from '@/common/components/ErrorAlert';

export default {
  components: {
    Fragment,
    ErrorAlertComponent,
  },

  data() {
    return {
      showPassword: false,
      form: {
        email: 'dev@sentinel.web.id',
        password: '123456',
      },
    };
  },

  computed: {
    ...rootModule.mapState({
      errorMessage: (state) =>
        state.errorMessage[AUTHENTICATIONTYPES.FETCH_LOGIN],
      formErrors: (state) =>
        state.errors[AUTHENTICATIONTYPES.FETCH_LOGIN] || {},
    }),

    ...authenticationModule.mapState({
      authStatus: (state) => state.status.auth,
    }),
  },

  methods: {
    ...authenticationModule.mapActions({
      fetchLogin: AUTHENTICATIONTYPES.FETCH_LOGIN,
    }),

    async loginHandler() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        try {
          await this.fetchLogin(this.form);
          this.$router.push({ name: 'projects' });
        } catch (e) {
          this.$toast.error("Can't login");
        }
      }
    },
  },
};
</script>
