module.exports = program => {
  program
    .command('start')
    .description('Start server')
    .option('--ssr', 'SSR mode')
    .action(({ ssr }) => {
      if (ssr) {
        require('../ssr/server');
      } else {
        require('../spa/server');
      }
    });
};
