<template>
  <v-sheet class="d-flex flex-column justify-space-around">
    <v-img contain class="mx-auto" :src="require('@/assets/logo.svg')" />
    <v-card width="90%" max-width="408" class="my-4 mx-auto">
      <v-card-text>
        <ValidationObserver ref="observer">
          <v-form class="text-left mb-6" :readonly="isLoading">
            <p class="body-2 mb-2">Email</p>
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
                placeholder="Email"
              >
              </v-text-field>
            </ValidationProvider>
            <p class="body-2 mb-2">Password</p>
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
            color="primary"
            :loading="isLoading"
            @click="loginHandler"
            class="text-capitalize"
          >
            Login
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
import VuexModule from '@/utils/vuex';

import * as AUTHENTICATIONTYPES from '@/store-namespace/authentication/types';

const authenticationModule = VuexModule(AUTHENTICATIONTYPES.MODULE_NAME);

export default {
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
