<template>
  <apex-chart
    type="line"
    :height="height"
    :options="chartOptions"
    :series="series"
  />
</template>

<script>
import { LINE_CHART_OPTIONS } from '@/common/constants/chart';

export default {
  props: {
    series: {
      type: Array,
      default: () => [],
    },
    categories: {
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
      const barSetup = LINE_CHART_OPTIONS;
      barSetup.xaxis.categories = this.categories;
      if (this.colors.length !== 0) {
        barSetup.colors = this.colors;
      }
      return barSetup;
    },
  },
};
</script>
