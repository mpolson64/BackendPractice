const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Party = require('./models/party');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI);

const router = express.Router();

router.get('/', (req, res) => {
  res.json({message: 'yeet'});
});

router.route('/party')
  .post((req, res) => {
    const party = new Party();
    console.log(req.query);
    console.log(req.params);
    party.name = 'mpo';

    party.save((err) => {
      if(err) {
        console.log(err);
      }
      else {
        res.json({message: "Party created"});
      }
    });
  })
  .get((req, res) => {
    Party.find((err, parties) => {
      if(err) {
        console.log(err);
      }
      else {
        res.json(parties);
      }
    });
  });

router.route('/party/:id')
  .get((req, res) => {
    Party.findById(req.params.id, (err, party) => {
      if (err) {
        res.json(err);
      }
      else {
        res.json(party);
      }
    });
  });

router.route('/party/:id/queue')
  .put((req, res) => {
    Party.findById(req.params.id, (err, party) => {
      if (err) {
        res.json(err);
      }
      else {
        res.json(req.body);
        party.addSongToQueue(req.body);
      }
    });
  });

app.use('/', router);

const server = app.listen(process.env.PORT, () => {
  console.log('Listening on port ' + process.env.PORT);
});
