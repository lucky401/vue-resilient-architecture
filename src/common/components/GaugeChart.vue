<template>
  <vue-gauge :refid="'gauge'" :options="options" />
</template>

<script>
import VueGauge from 'vue-gauge';

export default {
  components: { VueGauge },

  props: {
    value: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    options() {
      const options = {
        hasNeedle: true,
        outerNeedle: false,
        needleColor: '#1d1d1d',
        arcColors: ['#4caf50', '#fe5253', '#00bcd4'],
        arcOverEffect: true,
        arcLabels: [0, 1],
        arcPadding: 0,
        needleStartValue: 0,
      };
      options.needleValue = this.value;
      return options;
    },
  },
};
</script>
