const itemByType = {
    name: { type: String, required: true },
    priceOneDay: { type: Number, required: true },
    priceThreeDay: Number,
    priceWeek: Number,
    priceMonth: Number,
    priceThreeMonths: Number,
    buylimit: {type: Number, required: true},
    type: String,
};

module.exports = itemByType;