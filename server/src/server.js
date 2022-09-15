const mongoose = require('mongoose');
const port = 5001;
const app = require('./app');

mongoose.connect('mongodb://localhost:27017/Fergus');

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})