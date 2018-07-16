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

partySchema.methods.moveSong = function(songId) {
  console.log(this.queue[0]);
  let songIndex = this.queue.map(song => song._id).indexOf(songId);
  console.log(songIndex);
  let song = this.queue[songIndex];
  console.log(song);
  this.queue.splice(songIndex, 1);
  this.pool.push(song);
}

const Party = mongoose.model('Party', partySchema);

module.exports = Party;
