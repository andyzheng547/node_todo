// Require libraries
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

// Define and configure app
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Set db for connecting MongoDB
var db;

// Connect to MongoDB database then start app
MongoClient.connect('mongodb://' + process.env.DBUSER + ':' + process.env.DBPASSWORD + '@ds019816.mlab.com:19816/node_todo', (error, database) => {
  if (error) return console.log(error);

  db = database;

  // Listen on port 3000
  app.listen(3000, () => {
    console.log('Listening on 3000...');
  });

  // GET - /
  app.get('/', (req, res) => {
    db.collection('todos').find().toArray((err, results) => {
      if (err) return console.log(err);

      res.render('index.ejs', {todos: results});
    });
  });

  // POST - /todos
  app.post('/todos', (req, res) => {
    db.collection('todos').save(req.body, (err, result) => {
      if (err) return console.log(err);

      console.log('Saved todo to database');
      res.redirect('/');
    });
  });

  // PUT - /todos/:id
  app.put('/todos/:id', (req, res) => {
    db.collection('todos').findOneAndUpdate(
      {'_id': ObjectId(req.params.id)},
      {
        $set: {todo: req.body.todo}
      },
      { maxTimeMS: 100},
      (err, result) => {
        if (err) return res.send(err);

        console.log('Successful update');
        res.redirect('/');
      }
    );
  });

  // DELETE - /todos/:id
  app.delete('/todos/:id', (req, res) => {
    db.collection('todos').findOneAndDelete(
      {'_id': ObjectId(req.params.id)},
      {},
      (err, result) => {
        if (err) return res.send(500, err);

        console.log('Deleted todo');
        res.redirect('/');
      }
    );
  });


});
