function createLib (execlib) {
  'use strict';
  return {
    BufferedWaiter: require('./bufferedwaitercreator')(execlib),
    BufferedTrigger: require('./bufferedtriggercreator')(execlib)
  };
}
module.exports = createLib;
