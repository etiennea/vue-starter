const fs = require('fs-extra');
const webpack = require('webpack');
const baseConfig = require('../webpack.base');

module.exports = program => {
  program
    .command('build')
    .description('Start build process')
    .option('--ssr', 'SSR mode')
    .action(({ ssr }) => {
      let compiler;

      // Prepare compiler
      if (ssr) {
        compiler = webpack([
          require('../ssr/client.prod'),
          require('../ssr/ssr.prod'),
        ]);
      } else {
        compiler = webpack(require('../spa/spa.prod'));
      }

      // Clean
      fs.removeSync(baseConfig.output.path);

      // Run compiler
      compiler.run((err, stats) => {
        // eslint-disable-next-line
        if (err) return console.error(err);
        // eslint-disable-next-line
        console.log(stats.toString(baseConfig.stats));
      });
    });
};
