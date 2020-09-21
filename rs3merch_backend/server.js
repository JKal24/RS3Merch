const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const routes = require('./routes');
const priceDataManipulator = require('./utils/priceDataManipulator');

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});

priceDataManipulator.populateItems();