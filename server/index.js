const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

app.listen(5000, () => console.log(`Server started on port ${5000}`));





// module.exports = () => console.log('backend package')