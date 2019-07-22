const path = require('path');

module.exports = {
  pluginOptions: {
    ssr: {
      // Entry for each target
      entry: target => {
        console.log('++++++++++++++++++');
        console.log(`./src/entry-${target}`);
        console.log('++++++++++++++++++');
        return `./src/entry-${target}`;
      },
      // Default title
      defaultTitle: 'My app',
      // Path to favicon
      favicon: './public/favicon.ico',
      // See https://ssr.vuejs.org/guide/build-config.html#externals-caveats
      nodeExternalsWhitelist: [/\.css$/, /\?vue&type=style/],
      // Paths
      distPath: path.resolve(__dirname, './dist'),
      templatePath: path.resolve(__dirname, './dist/index.html'),
      serviceWorkerPath: path.resolve(__dirname, './dist/service-worker.js'),
    }
  },
  devServer: {
    proxy: 'https://cnodejs.org'
  }
}