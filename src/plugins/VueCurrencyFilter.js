import Vue from 'vue';
import VueCurrencyFilter from 'vue-currency-filter';

Vue.use(VueCurrencyFilter, {
  symbol: 'Rp.',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true,
  avoidEmptyDecimals: undefined,
});

export default VueCurrencyFilter;
