require('./config/config');
const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname, '../public');
const app = express();
app.use(express.static(publicPath));

app.listen(process.env.PORT, () => {
    console.log(`App started on port ${process.env.PORT}`);
});