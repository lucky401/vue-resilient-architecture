module.exports = {
  transpileDependencies: ['vuetify'],
  publicPath: process.env.NODE_ENV !== 'development' ? '/' : '/',
  pwa: {
    workboxPluginMode: 'GenerateSW',
    name: 'Dashboard - Vue.js',
    background_color: '#004BF9',
    themeColor: '#004BF9',
    msTileColor: '#ffffff',
    appleMobileWebAppStatusBarStyle: 'white',
    manifestOptions: {
      name: 'Dashboard - Vue.js',
      short_name: 'Dashboard',
      background_color: '#004BF9',
      start_url: '.',
      display: 'standalone',
      theme_color: '#004BF9',
    },
  },
};
