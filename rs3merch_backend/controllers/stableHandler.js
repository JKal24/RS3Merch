const infoParser = require('../utils/infoParser');
const commands = require('../database/commands');
const dataManipulator = require('../utils/priceDataManipulator');

module.exports = {

    async initializeStable(req, res) {
        /**
        * Before adding in our items, make sure that the item_uris table is empty
        * and does not have any data from a previous instance
        */
        await commands.clearTable_item_uris();

        await infoParser.getBuyLimit_item_uris('STABLE');
    },

    async createPage(req, res) {
        return res.json(await dataManipulator.populateItems('STABLE'));
    }
}