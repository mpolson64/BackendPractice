const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI);

const router = express.Router();

router.get('/', (req, res) => {
  res.json({message: 'yeet'});
});

app.use('/', router);

const server = app.listen(process.env.PORT, () => {
  console.log('Listening on port ' + process.env.PORT);
});
