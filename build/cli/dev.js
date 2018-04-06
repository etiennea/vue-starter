const fs = require('fs-extra');
const baseConfig = require('../webpack.base');

module.exports = program => {
  program
    .command('dev')
    .description('Start dev server with HMR')
    .option('--ssr', 'SSR mode')
    .action(({ ssr }) => {
      // Clean
      fs.removeSync(baseConfig.output.path);

      if (ssr) {
        require('../ssr/server');
      } else {
        require('../spa/devServer');
      }
    });
};
