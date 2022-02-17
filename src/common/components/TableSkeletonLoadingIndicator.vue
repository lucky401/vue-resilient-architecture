<template>
  <v-sheet>
    <v-skeleton-loader
      class="ma-auto"
      :loading="isLoading"
      transition="fade-transition"
      :tile="false"
      type="table-row"
      v-for="i in isLoading ? 10 : 1"
      :key="`data-loading-${i}`"
      max-height="100%"
    >
      <slot />
    </v-skeleton-loader>
  </v-sheet>
</template>

<script>
export default {
  props: {
    isLoading: { type: Boolean, default: false },
  },
};
</script>
