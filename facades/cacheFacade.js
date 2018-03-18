const Cache = require('../models/cache');

/**
 * This will be a facade to abstract complex operations with many model calls.
 */
const cacheFacade = {

  /**
   * This does the heavy lift of checking if a limit has been reached and then
   * findind the oldest untouched record to then remove it and insert the new
   * one.
   *
   * @param {Object} record - the record to be cached
   * @param {Number} limit - the record limit for the cache
   */
  saveOrOverriteRecord(record, limit, next) {
    Cache.count({}, (err, count) => {
      if (count >= limit) {

        // Find the oldest untouched record
        Cache.find({}).sort({ lastModified: 'asc' }).limit(1).exec((err, oldRecord) => {

          //Remove that record
          Cache.remove({ key: oldRecord[0].key }, (err) => {

            //Create the new one
            Cache.create(record, (err, createdRecord) => {
              next(createdRecord);
            });
          });
        });
      } else {
        Cache.create(record, (err, createdRecord) => {
          next(createdRecord);
        });
      }
    });
  }
};

module.exports = cacheFacade;