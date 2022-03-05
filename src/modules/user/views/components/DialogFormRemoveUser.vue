<template>
  <dialog-remove-component
    v-model="innerValue"
    :is-loading="status === 'pending'"
    :error-message="errorMessage"
    @close="closeHandler"
    @confirm="removedHandler"
  >
    <template slot="content">
      <p>
        Are you sure to remove
        <span class="font-weight-bold" v-if="tempData && tempData.name">
          {{ tempData.name }}
        </span>
        ?
      </p>
    </template>
  </dialog-remove-component>
</template>

<script>
import VuexModule from '@/utils/vuex';

import * as ROOTTYPES from '@/store-namespace/root/types';
import * as USERTYPES from '../../store/types';

const rootModule = VuexModule(ROOTTYPES.MODULE_NAME);
const userModule = VuexModule(USERTYPES.MODULE_NAME);

import MixinModal from '@/mixins/mixin-modal';

import DialogRemoveComponent from '@/common/components/DialogRemove';

export default {
  mixins: [MixinModal],

  props: {
    tempData: {
      type: Object,
      default: () => ({}),
    },
  },

  components: {
    DialogRemoveComponent,
  },

  data() {
    return {
      status: 'idle',
    };
  },

  computed: {
    ...rootModule.mapState({
      errorMessage: (state) => state.errorMessage[USERTYPES.FETCH_USER_REMOVE],
      formErrors: (state) => state.errors[USERTYPES.FETCH_USER_REMOVE] || {},
    }),
  },

  methods: {
    ...rootModule.mapMutations({
      setRootState: ROOTTYPES.SET_STATE,
    }),

    ...userModule.mapActions({
      fetchRemove: USERTYPES.FETCH_USER_REMOVE,
    }),

    clearFormError() {
      this.setRootState({
        accessor: `errorMessage.${USERTYPES.FETCH_USER_REMOVE}`,
        value: '',
      });
      this.setRootState({
        accessor: `errors.${USERTYPES.FETCH_USER_REMOVE}`,
        value: {},
      });
    },

    closeHandler() {
      this.clearFormError();
      this.status = 'idle';
      this.innerValue = false;
      this.$emit('close');
    },

    async removedHandler() {
      this.status = 'pending';
      try {
        await this.fetchRemove(this.tempData.id);
        this.closeHandler();
        this.$emit('removed');
        this.status = 'resolved';
      } catch (e) {
        this.status = 'rejected';
      }
    },
  },
};
</script>
