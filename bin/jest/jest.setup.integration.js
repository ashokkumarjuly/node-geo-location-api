//  To handle the problem caused by mysql2 doing dynamic lazy require of encodings
// and Jest not being able to handle this.
require('mysql2/node_modules/iconv-lite').encodingExists('foo');
jest.setTimeout(30000);
