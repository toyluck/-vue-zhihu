/**
 * Created by hyc on 2016/12/22.
 */

const log4js = require('log4js'),
    logger = log4js.getLogger('hyc-')
class HashTable {
    constructor(maxLenth) {

        this.data = {}
        this.maxlenth = maxLenth || 1000
    }

    //todo lru
    set(key, data) {
        if (Object.keys(this.data).length > this.maxlenth) {
            console.log('---refresh-----')
            this.refreshData()
        }
        logger.info('key = ',key,' data= ',data)
        this.data[key] = data
    }

    get(key) {

        if (this.data[key]) {
            return this.data[key]
        }
        return null
    }

    refreshData() {
        for (const key in this.data) {
            console.log(data)
            delete this.data[key]
        }
    }

}

module.exports = exports = new HashTable()