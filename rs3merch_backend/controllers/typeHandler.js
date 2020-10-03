const infoParser = require('../utils/infoParser');
const commands = require('../database/commands');
const dataManipulator = require('../utils/priceDataManipulator');
const config = require('../utils/config');

module.exports = {

    async showTypes(req, res) {
        return res.json(Object.keys(config.standardTypes));
    },

    async initializeType(req, res) {
        /**
         * Before adding in our items, make sure that the item_uris table is empty
         * and does not have any data from a previous instance
         */

        await commands.clearTable_item_uris();

        if (config.standardTypes.hasOwnProperty(req.params.type)) {
            await infoParser.getByType_item_uris(req.params.type);
        }
        
        return res.json(true);
    },

    async createPage(req, res) {
        return res.json(await dataManipulator.populateItems());
    },
} 