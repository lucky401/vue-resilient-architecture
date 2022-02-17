<template>
  <v-dialog
    scrollable
    v-model="innerValue"
    :max-width="maxWidth"
    :persistent="persistent"
    @click:outside="clickOutsideHandler"
  >
    <v-card>
      <v-card-title>
        <slot name="title" />
      </v-card-title>
      <slot name="subtitle" />
      <v-divider />
      <v-card-text class="pt-6">
        <slot name="content" />
        <error-alert-component :message="errorMessage" />
      </v-card-text>
      <v-card-actions class="pb-6 px-6">
        <slot name="actions">
          <v-spacer />
          <v-btn
            small
            outlined
            color="white"
            elevation="0"
            :disabled="isLoading"
            class="text-capitalize grey--text text--darken-1"
            @click="() => $emit('close')"
          >
            {{ cancelText }}
          </v-btn>
          <v-btn
            small
            color="info"
            elevation="0"
            :disabled="isLoading"
            :loading="isLoading"
            @click="() => $emit('submit')"
            class="text-capitalize"
          >
            {{ submitText }}
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import MixinModal from '@/mixins/mixin-modal';

import ErrorAlertComponent from './ErrorAlert';

export default {
  mixins: [MixinModal],

  components: {
    ErrorAlertComponent,
  },

  props: {
    persistent: {
      type: Boolean,
      default: true,
    },

    maxWidth: {
      type: Number,
      default: 400,
    },

    errorMessage: {
      type: String,
      default: '',
    },

    isLoading: {
      type: Boolean,
      default: false,
    },

    cancelText: {
      type: String,
      default: 'Cancel',
    },

    submitText: {
      type: String,
      default: 'Save',
    },
  },

  methods: {
    clickOutsideHandler() {
      if (this.persistent) return;
      this.$emit('close');
    },
  },
};
</script>
