<template>
  <apex-chart
    type="pie"
    :height="height"
    :options="chartOptions"
    :series="series"
  />
</template>

<script>
import { PIE_CHART_OPTIONS } from '@/common/constants/chart';

export default {
  props: {
    series: {
      type: Array,
      default: () => [],
    },
    labels: {
      type: Array,
      default: () => [],
    },
    colors: {
      type: Array,
      default: () => [],
    },
    height: {
      type: String,
      default: '300',
    },
  },

  computed: {
    chartOptions() {
      const pieSetup = PIE_CHART_OPTIONS;
      pieSetup.labels = this.labels;
      if (this.colors.length !== 0) {
        pieSetup.colors = this.colors;
      }
      return pieSetup;
    },
  },
};
</script>
