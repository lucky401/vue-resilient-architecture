import Vue from 'vue';
import {
  required,
  email,
  max,
  min,
  min_value,
  max_value,
  confirmed,
} from 'vee-validate/dist/rules';
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate';

extend('required', {
  ...required,
  message: '{_field_} is required',
});

extend('max', {
  ...max,
  message: 'Kolom maksimal {length} karakter',
});

extend('min', {
  ...min,
  message: 'Kolom minimal {length} karakter',
});

extend('min_10000', {
  ...min_value,
  message: 'Kolom minimal 10000',
});

extend('min_0', {
  ...min_value,
  message: 'Kolom minimal 0',
});

extend('min_1', {
  ...min_value,
  message: 'Kolom minimal 1',
});

extend('max_100', {
  ...max_value,
  message: 'Kolom maksimal 100',
});

extend('email', {
  ...email,
  message: 'Kolom email belum benar',
});

extend('confirmed', {
  ...confirmed,
  message: 'Kolom konfirmasi password belum benar',
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
};
