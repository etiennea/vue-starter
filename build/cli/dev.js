const fs = require('fs-extra');
const { getPath } = require('../utils');

module.exports = program => {
  program
    .command('dev')
    .description('Start dev server with HMR')
    .option('--ssr', 'SSR mode')
    .action(({ ssr }) => {
      // Clean
      fs.removeSync(getPath('.', 'dist'));

      if (ssr) {
        require('../servers/ssr');
      } else {
        require('../servers/spa.dev');
      }
    });
};
