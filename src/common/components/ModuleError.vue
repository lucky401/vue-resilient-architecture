<template>
  <v-sheet class="mx-auto text-center" max-width="80%">
    <v-icon x-large color="error">mdi-alert-circle-outline</v-icon>
    <span class="text-center d-block body-2 my-2">
      {{ errorMessage }}
    </span>
  </v-sheet>
</template>

<script>
export default {
  props: {
    errorMessage: {
      type: String,
      default: 'Terjadi kekeliruan!',
    },
  },
};
</script>
