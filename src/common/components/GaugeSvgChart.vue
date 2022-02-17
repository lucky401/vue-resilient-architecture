<template>
  <vue-svg-gauge
    :start-angle="-110"
    :end-angle="110"
    :value="value"
    :separator-step="0"
    :min="0"
    :max="100"
    :gauge-color="[
      { offset: 0, color: '#347AB0' },
      { offset: 100, color: '#8CDFAD' },
    ]"
    :scale-interval="5"
  />
</template>

<script>
import { VueSvgGauge } from 'vue-svg-gauge';

export default {
  components: {
    VueSvgGauge,
  },

  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
};
</script>
