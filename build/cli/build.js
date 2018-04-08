const fs = require('fs-extra');
const webpack = require('webpack');
const getConfig = require('../webpack.config');

module.exports = program => {
  program
    .command('build')
    .description('Start build process')
    .option('--ssr', 'SSR mode')
    .action(({ ssr }) => {
      let compiler;

      let baseConfig;

      // Prepare copiler
      if (ssr) {
        // SSR
        baseConfig = getConfig({
          dev: false,
          client: true,
          ssr: true,
        });
        compiler = webpack([
          baseConfig,
          getConfig({
            dev: false,
            client: false,
            ssr: true,
          }),
        ]);
      } else {
        // SPA
        baseConfig = getConfig({
          dev: false,
          client: true,
          ssr: false,
        });
        compiler = webpack(baseConfig);
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
