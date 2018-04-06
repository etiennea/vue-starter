const program = require('commander');

require('./build')(program);
require('./dev')(program);
require('./start')(program);

program.version('0.1.0').parse(process.argv);
