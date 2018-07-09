const express = require('express');

const app = express();

const server = app.listen(process.env.PORT, () => {
  console.log('Listening on port ' + process.env.PORT);
});
