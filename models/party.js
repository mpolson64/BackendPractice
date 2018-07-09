const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const partySchema = new Schema({
  name: String,
  queue: Array,
  pool: Array
});

const Party = mongoose.model('Party', partySchema);

module.exports = Party;
