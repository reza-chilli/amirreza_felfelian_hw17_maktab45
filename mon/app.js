const express = require("express");
const mongoose = require("mongoose");
const ejs = require('ejs')
const app = express();
const api = require('./router/api');
const path = require('path')

app.set('view engine', 'ejs');
app.set('views', './views')
mongoose.connect("mongodb://localhost:27017/company", { useNewUrlParser: true,  useUnifiedTopology: true});

app.use(express.static(path.join(__dirname, "views")))
app.use('/', api)




app.listen(8080, function () {
  console.log("app is running on port 8080....");
});
