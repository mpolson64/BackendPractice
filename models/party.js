const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const partySchema = new Schema({
  name: {type: String, unique: true, required: true},
  queue: [{
    name: String,
    createdAt: Date
  }],
  pool: [{
    name: {type: String, unique: true},
    createdAt: Date
  }]
});

partySchema.methods.addSongToQueue = function(song) {
  if(!this.queue.map(song => song.name).includes(song.name)) {
    this.queue.push({
      name: song.name,
      createdAt: new Date()
    });
  }
  else {
    console.log('not unique');
  }
};

partySchema.methods.moveSong = function(song) {
  console.log(this.queue);
}

const Party = mongoose.model('Party', partySchema);

module.exports = Party;
