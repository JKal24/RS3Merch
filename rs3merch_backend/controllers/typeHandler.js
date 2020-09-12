const infoParser = require('../utils/infoParser');
const commands = require('../database/commands');
const dataManipulator = require('../utils/priceDataManipulator');
const config = require('../utils/config');

module.exports = {

    async initializeType(req, res) {
        /**
         * Before adding in our items, make sure that the item_uris table is empty
         * and does not have any data from a previous instance
         */

        await commands.clearTable_item_uris();

        if (config.standardTypes.hasOwnProperty(req.body.type)) {
            infoParser.getByType_item_uris(req.body.type);
        }
    },

    async createPage(req, res) {
        return res.json(dataManipulator.populateItems());
    },
} 