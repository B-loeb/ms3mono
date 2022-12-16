const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('express').json;
require('dotenv').config();


//import routes
const UserRouter = require('./api/User');
//app
const app = express();
//db
mongoose.connect(process.env.MONGODB_URI,{ 
    useNewUrlParser: true, useUnifiedTopology: true,
})
.then(() => {
    console.log("DB CONNECTED");
})
.catch((err) => console.log(err));
//middleware
app.use(express.json());
app.use(bodyParser());
//middleware routes
app.use('/user', UserRouter)


//listener

app.listen(5000, () => console.log(`Server started on port ${5000}`));





// module.exports = () => console.log('backend package')