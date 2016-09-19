const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// database config
// ============================================
// Here we find an appropriate database to connect to, defaulting to localhost if we don't find one.
var uristring = process.env.MONGODB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nytsearch';
mongoose.connect(uristring, function (err, res) {
  if (err)
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  else
    console.log ('Succeeded connected to: ' + uristring);
});


app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json())

const main = require('./routes/index.js');
const api = require('./routes/index.js');
app.use('/', main);
app.use('/api', api);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
  console.log('App listening on PORT ' + PORT);
});
