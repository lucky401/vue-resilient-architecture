export const LINE_CHART_OPTIONS = {
  chart: {
    type: 'line',
    height: 300,
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  title: {
    show: false,
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        if (value >= 1000000000) {
          return (value / 1000000000).toFixed(0) + 'B';
        }
        if (value >= 1000000) {
          return (value / 1000000).toFixed(0) + 'M';
        }
        if (value >= 1000) {
          return (value / 1000).toFixed(0) + 'K';
        }
        return value;
      },
    },
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: [],
  },
};

export const PIE_CHART_OPTIONS = {
  chart: {
    width: 380,
    type: 'pie',
  },
  labels: [],
  legend: {
    position: 'bottom',
  },
};
