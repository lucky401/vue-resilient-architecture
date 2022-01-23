module.exports = {
  transpileDependencies: ['vuetify'],
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  pwa: {
    workboxPluginMode: 'GenerateSW',
    name: 'Dashboard Sentinel',
    background_color: '#004BF9',
    themeColor: '#004BF9',
    msTileColor: '#ffffff',
    appleMobileWebAppStatusBarStyle: 'white',
    manifestOptions: {
      name: 'Dashboard Sentinel',
      short_name: 'Sentinel',
      background_color: '#004BF9',
      start_url: '.',
      display: 'standalone',
      theme_color: '#004BF9',
    },
  },
};
