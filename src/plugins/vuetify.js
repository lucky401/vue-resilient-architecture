import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import minifyTheme from 'minify-css-string';
import LRUCache from 'lru-cache';

Vue.use(Vuetify);

const themeCache = new LRUCache({
  max: 10,
  maxAge: 1000 * 60 * 60, // 1 hour
});

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#ffec78',
        secondary: {
          base: '#93a3b6',
          lighten1: '#322f64',
          darken1: '#1e1633',
          darken2: '#130f40',
        },
        accent: '#fef8fd',
      },
    },
  },
  options: { minifyTheme, themeCache, cspNonce: 'dQw4w9WgXcQ' },
});
