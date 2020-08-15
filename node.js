npm init
npm install --save express mongodb@2.2.16 body-parser
npm install --save-dev nodemon
 "scripts": {    "dev": "nodemon server.js"  },
 {  "name": "notable",  "version": "1.0.0",  "description": "",  "main": "server.js",  "scripts": {    "dev": "nodemon server.js"  },  "author": "",  "license": "ISC",  "dependencies": {    "body-parser": "^1.15.2",    "express": "^4.14.0",    "mongodb": "^2.2.16"  },  "devDependencies": {    "nodemon": "^1.11.0"  }}
 const express        = require('express');const MongoClient    = require('mongodb').MongoClient;const bodyParser     = require('body-parser');
 const app            = express();
 const port = 8000;
 app.listen(port, () => {  console.log('We are live on ' + port);});
 mkdir appcd appmkdir routescd routestouch index.jstouch note_routes.js
 module.exports = function(app, db) {
};
const noteRoutes = require('./note_routes');
module.exports = function(app, db) {  noteRoutes(app, db);  // Other route groups could go here, in the future};
const express        = require('express');const MongoClient    = require('mongodb').MongoClient;const bodyParser     = require('body-parser');
const app            = express();
const port = 8000;
require('./app/routes')(app, {});app.listen(port, () => {  console.log('We are live on ' + port);});
module.exports = function(app, db) {  app.post('/notes', (req, res) => {    // You'll create your note here.    res.send('Hello')  });};
module.exports = function(app, db) {  app.post('/notes', (req, res) => {    console.log(req.body)    res.send('Hello')  });};
const express        = require('express');const MongoClient    = require('mongodb').MongoClient;const bodyParser     = require('body-parser');
const app            = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
require('./app/routes')(app, {});app.listen(port, () => {  console.log('We are live on ' + port);});
mkdir config cd configtouch db.js
module.exports = {  url : YOUR URL HERE};
const express        = require('express');const MongoClient    = require('mongodb').MongoClient;const bodyParser     = require('body-parser');const db             = require('./config/db');
const app            = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(db.url, (err, database) => {  if (err) return console.log(err)  require('./app/routes')(app, database);
  app.listen(port, () => {    console.log('We are live on ' + port);  });               })
  db.collection('notes')
  const note = { text: req.body.body, title: req.body.title}  db.collection('notes').insert(note, (err, results) => {}
  module.exports = function(app, db) {  app.get('/notes/:id', (req, res) => {      });
  app.post('/notes', (req, res) => {    const note = { text: req.body.body, title: req.body.title };    db.collection('notes').insert(note, (err, result) => {      if (err) {         res.send({ 'error': 'An error has occurred' });       } else {        res.send(result.ops[0]);      }    });  });};
  module.exports = function(app, db) {  app.get('/notes/:id', (req, res) => {    const details = { '_id': <ID GOES HERE> };    db.collection('notes').findOne(details, (err, item) => {      if (err) {        res.send({'error':'An error has occurred'});      } else {        res.send(item);      }    });  });
  app.post('/notes', (req, res) => {    const note = { text: req.body.body, title: req.body.title };    db.collection('notes').insert(note, (err, result) => {      if (err) {         res.send({ 'error': 'An error has occurred' });       } else {        res.send(result.ops[0]);      }    });  });};
  var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {  app.get('/notes/:id', (req, res) => {    const id = req.params.id;    const details = { '_id': new ObjectID(id) };    db.collection('notes').findOne(details, (err, item) => {      if (err) {        res.send({'error':'An error has occurred'});      } else {        res.send(item);      }     });  });
var ObjectID = require('mongodb').ObjectID;
app.post('/notes', (req, res) => {    const note = { text: req.body.body, title: req.body.title };    db.collection('notes').insert(note, (err, result) => {      if (err) {         res.send({ 'error': 'An error has occurred' });       } else {        res.send(result.ops[0]);      }    });  });};
app.delete('/notes/:id', (req, res) => {    const id = req.params.id;    const details = { '_id': new ObjectID(id) };    db.collection('notes').remove(details, (err, item) => {      if (err) {        res.send({'error':'An error has occurred'});      } else {        res.send('Note ' + id + ' deleted!');      }     });  });
 app.put('/notes/:id', (req, res) => {    const id = req.params.id;    const details = { '_id': new ObjectID(id) };    const note = { text: req.body.body, title: req.body.title };    db.collection('notes').update(details, note, (err, result) =&gt; {      if (err) {          res.send({'error':'An error has occurred'});      } else {          res.send(note);      }     });  });
 
