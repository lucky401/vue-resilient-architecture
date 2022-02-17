<template>
  <vue-speedometer
    :fluid-width="true"
    :min-value="0"
    :max-value="100"
    :value="value"
    needle-color="black"
  />
</template>

<script>
import VueSpeedometer from 'vue-speedometer';

export default {
  components: { VueSpeedometer },

  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
};
</script>
