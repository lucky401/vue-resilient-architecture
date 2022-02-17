<template>
  <v-alert v-if="message" text type="error" class="custom-alert my-4">
    <p class="body-2 mb-0">
      {{ message }}
    </p>
  </v-alert>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: '',
    },
  },
};
</script>
