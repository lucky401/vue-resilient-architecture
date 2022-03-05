<template>
  <dialog-form-component
    v-model="innerValue"
    :max-width="600"
    submit-text="Filter"
    @close="closeHandler"
    @submit="filterHandler"
  >
    <template v-slot:title>
      Filter Users
      <v-btn class="mt-n1" icon dark top right absolute @click="closeHandler">
        <v-icon color="grey lighten-1">mdi-close</v-icon>
      </v-btn>
    </template>
  </dialog-form-component>
</template>

<script>
import MixinModal from '@/mixins/mixin-modal';

import DialogFormComponent from '@/common/components/DialogForm';

export default {
  mixins: [MixinModal],

  props: {
    filters: {
      type: Object,
      default: () => ({}),
    },
  },

  components: {
    DialogFormComponent,
  },

  data() {
    return {
      innerFilters: {},
    };
  },

  watch: {
    filters: {
      deep: true,
      handler(newValue) {
        this.innerFilters = { ...newValue };
      },
    },
  },

  methods: {
    closeHandler() {
      this.innerValue = false;
      this.$emit('close');
    },

    filterHandler() {
      this.$emit('filter', this.innerFilters);
    },
  },
};
</script>
