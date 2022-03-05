<template>
  <dialog-form-component
    v-model="innerValue"
    :max-width="600"
    :is-loading="status === 'pending'"
    :error-message="errorMessage"
    :submit-text="submitText"
    @close="closeHandler"
    @submit="submitHandler"
  >
    <template v-slot:title>
      {{ formTitle }}
      <v-btn class="mt-n1" icon dark top right absolute @click="closeHandler">
        <v-icon color="grey lighten-1">mdi-close</v-icon>
      </v-btn>
    </template>
    <template v-slot:content>
      <ValidationObserver ref="observer">
        <v-form ref="form" :readonly="status === 'pending'">
          <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
            <span class="d-block grey--text mb-2 text--darken-2"> Name </span>
            <v-text-field
              dense
              outlined
              v-model="form.name"
              placeholder="Name"
              :error-messages="formErrors.name || errors"
            />
          </ValidationProvider>
          <ValidationProvider
            name="Email"
            rules="required|email"
            v-slot="{ errors }"
          >
            <span class="d-block grey--text mb-2 text--darken-2"> Email </span>
            <v-text-field
              dense
              outlined
              v-model="form.email"
              placeholder="email"
              :error-messages="formErrors.email || errors"
            />
          </ValidationProvider>
          <ValidationProvider
            name="Phone Number"
            rules="required|min:8|max:13"
            v-slot="{ errors }"
          >
            <span class="d-block grey--text mb-2 text--darken-3">
              Phone Number
            </span>
            <v-text-field
              dense
              outlined
              type="number"
              placeholder="0854678901"
              v-model="form.phone"
              :error-messages="formErrors.phone || errors"
            />
          </ValidationProvider>
        </v-form>
      </ValidationObserver>
    </template>
  </dialog-form-component>
</template>

<script>
import VuexModule from '@/utils/vuex';

import * as ROOTTYPES from '@/store-namespace/root/types';
import * as USERTYPES from '../../store/types';

const rootModule = VuexModule(ROOTTYPES.MODULE_NAME);
const userModule = VuexModule(USERTYPES.MODULE_NAME);

import MixinModal from '@/mixins/mixin-modal';

import DialogFormComponent from '@/common/components/DialogForm';

export default {
  mixins: [MixinModal],

  props: {
    tempData: {
      type: Object,
      default: () => ({}),
    },
  },

  components: {
    DialogFormComponent,
  },

  data() {
    return {
      dialogTitle: 'User',
      form: {
        name: '',
        email: '',
        phone: '',
      },
      status: 'idle',
    };
  },

  computed: {
    ...rootModule.mapState({
      errorMessage: (state) =>
        state.errorMessage[USERTYPES.FETCH_USER_ADD] ||
        state.errorMessage[USERTYPES.FETCH_USER_UPDATE],
      formErrors: (state) =>
        state.errors[USERTYPES.FETCH_USER_ADD] ||
        state.errors[USERTYPES.FETCH_USER_UPDATE] ||
        {},
    }),

    formTitle() {
      const { id } = this.form;

      let title = 'Add';

      if (id) title = 'Update';

      return `${title} ${this.dialogTitle}`;
    },

    submitText() {
      const { id } = this.form;

      let title = 'Add';

      if (id) title = 'Update';

      return title;
    },
  },

  watch: {
    tempData: {
      deep: true,
      handler(newVal) {
        this.form = Object.assign({}, newVal);
      },
    },
  },

  methods: {
    ...rootModule.mapMutations({
      setRootState: ROOTTYPES.SET_STATE,
    }),

    ...userModule.mapActions({
      fetchAdd: USERTYPES.FETCH_USER_ADD,
      fetchUpdate: USERTYPES.FETCH_USER_UPDATE,
    }),

    clearFormError() {
      this.setRootState({
        accessor: `errorMessage.${USERTYPES.FETCH_USER_ADD}`,
        value: '',
      });
      this.setRootState({
        accessor: `errorMessage.${USERTYPES.FETCH_USER_UPDATE}`,
        value: '',
      });
      this.setRootState({
        accessor: `errors.${USERTYPES.FETCH_USER_ADD}`,
        value: {},
      });
      this.setRootState({
        accessor: `errors.${USERTYPES.FETCH_USER_UPDATE}`,
        value: {},
      });
    },

    resetForm() {
      this.clearFormError();
      if (this.$refs.observer) this.$refs.observer.reset();
      this.status = 'idle';
      this.form = {
        id: '',
        name: '',
        email: '',
        phoneNumber: '',
      };
    },

    closeHandler() {
      this.resetForm();
      this.innerValue = false;
      this.$emit('close');
    },

    async submitHandler() {
      this.status = 'pending';
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        try {
          if (this.form.id) {
            await this.fetchUpdate({
              data: this.form,
              userId: this.form.id,
            });
          } else {
            await this.fetchAdd({
              data: this.form,
            });
          }
          this.resetForm();
          this.innerValue = false;
          this.$emit('saved');
          this.status = 'resolved';
        } catch (e) {
          this.status = 'rejected';
        }
      }
    },
  },
};
</script>
