const commands = require('../database/commands');
const infoParser = require('./infoParser');
const ITEMS_PER_PAGE = 25;

module.exports = {
    async populateItems(evaluator) {
        // Select a number of uris based on the defined limit per page.
        let ids = await commands.getAllID_item_uris();
        const len = ITEMS_PER_PAGE < ids.length ? ITEMS_PER_PAGE : ids.length;

        /**
         * Before adding in our items, make sure that the item table is empty
         * and does not have any data from a previous instance.
         */
        await commands.clearTable('items');

        /**
         * For each uri, add the respective item to the items table,
         * then return this value.
         */
        let populate = 0;
        switch (evaluator) {
            case 'STABLE':
                while (populate < len) {
                    const info = await infoParser.getItemInfo(await commands.consume_item_uris(ids[Math.floor(Math.random() * ids.length)]));
                    if (evaluateStable(info)) {
                        await commands.addToTable_items(trimData(info));
                        populate++;
                    }
                }
                break;

            case 'INVEST':
                while (populate < len) {
                    const info = await infoParser.getItemInfo(await commands.consume_item_uris(ids[Math.floor(Math.random() * ids.length)]));
                    if (evaluateInvest(info)) {
                        await commands.addToTable_items(trimData(info));
                        populate++;
                    }
                }
                break;

            case 'ORDINARY':
                while (populate < len) {
                    const info = await infoParser.getItemInfo(await commands.consume_item_uris(ids[Math.floor(Math.random() * ids.length)]));
                    if (evaluateOrdinary(info)) {
                        await commands.addToTable_items(trimData(info));
                        populate++;
                    }
                }
                break;

            default:
                return [];
        }

        return await commands.getAll_items();
    }
}


function evaluateStable(info) {
    // Passed in as an object with the entries contained in the database

    // Create some simple tests to filter out unsatisfactory items from all evaluation functions

    if (((0.2 <= info.cvar_month <= 0.015) && 0.25 <= info.cvar_three_months) ||
        ((0.25 <= info.cvar_three_months <= 0.03) && 0.2 <= info.cvar_month) ||
        Math.min(priceChange(info.price_one_day, info.highest_price_week), priceChange(info.price_one_day, info.lowest_price_week)) >= 0.002 ||
        Math.min(priceChange(info.price_one_day, info.highest_price_month), priceChange(info.price_one_day, info.lowest_price_month)) >= 0.004) {

        return true;
    }

    return false;
}

function evaluateInvest(info) {
    if ((info.average_three_months <= 1500 && info.undervaluation <= 0.95 && info.cvar_month <= 0.1 && info.cvar_three_months <= 0.15) ||
        (1500 < info.average_three_months <= 15000 && info.undervaluation <= 0.98 && info.cvar_month <= 0.07 && info.cvar_three_months <= 0.1) ||
        (15000 < info.average_three_months && info.undervaluation <= 1.0 && info.cvar_month <= 0.01 && info.cvar_three_months <= 0.03)) {

        return true;
    }

    return false;
}

function evaluateOrdinary(info) {
    const hasVariation = info.cvar_month >= 0.01;

    if (info.buy_limit <= 5000) {
        if (info.buy_limit <= 500) {
            if (info.buy_limit <= 100) {
                return (info.price_today >= 2500 || info.average_three_months >= 2200) && hasVariation;
            }
            return (info.price_today >= 850 || info.average_three_months >= 700) && hasVariation;
        }
        return (info.price_today >= 400 || info.average_three_months >= 320) && hasVariation;
    } else {
        return (info.average >= 150 && (hasVariation || info.cvar_three_months >= 0.2));
    }
}

function trimData(info) {
    // Transform the data to be put into the SQL table, removes 3 month co-eff of variation and average.

    delete info.cvar_three_months;
    delete info.average_three_months;
    return info;
}

function priceChange(newValue, oldValue) {
    return Math.round(((newValue - oldValue) / oldValue) * 100000) / 1000;
}