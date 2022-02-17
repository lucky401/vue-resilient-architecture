<template>
  <dialog-form-component
    v-model="innerValue"
    :max-width="350"
    :is-loading="isLoading"
    :error-message="errorMessage"
  >
    <template v-slot:title>
      {{ title }}
      <v-btn class="mt-n1" icon dark top right absolute @click="closeHandler">
        <v-icon color="grey lighten-1">mdi-close</v-icon>
      </v-btn>
    </template>
    <template v-slot:content>
      <slot name="content" />
    </template>
    <template v-slot:actions>
      <v-spacer></v-spacer>
      <v-btn
        small
        outlined
        color="white"
        elevation="0"
        :disabled="isLoading"
        class="text-capitalize grey--text text--darken-1"
        @click="closeHandler"
      >
        {{ cancelText }}
      </v-btn>
      <v-btn
        dark
        small
        color="red"
        elevation="0"
        :loading="isLoading"
        :disabled="isLoading"
        class="text-capitalize"
        @click="confirmHandler"
      >
        {{ confirmText }}
      </v-btn>
    </template>
  </dialog-form-component>
</template>

<script>
import MixinModal from '@/mixins/mixin-modal';

import DialogFormComponent from './DialogForm';

export default {
  mixins: [MixinModal],

  components: {
    DialogFormComponent,
  },

  props: {
    errorMessage: {
      type: String,
      default: '',
    },

    isLoading: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      default: 'Information',
    },

    cancelText: {
      type: String,
      default: 'Cancel',
    },

    confirmText: {
      type: String,
      default: 'Remove',
    },
  },

  methods: {
    closeHandler() {
      this.$emit('close');
    },

    confirmHandler() {
      this.$emit('confirm');
    },
  },
};
</script>
