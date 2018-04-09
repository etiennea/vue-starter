module.exports = program => {
  program
    .command('start')
    .description('Start server')
    .option('--ssr', 'SSR mode')
    .action(({ ssr }) => {
      if (ssr) {
        require('../servers/ssr');
      } else {
        require('../servers/spa.prod');
      }
    });
};
