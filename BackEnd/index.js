// const mongoose = require('mongoose');
const app = require('./app');
// const { mongoDB } = require('./config/configuration');

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   reconnectTries: Number.MAX_VALUE,
//   reconnectInterval: 500,
//   poolSize: 500,
//   bufferMaxEntries: 0,
// };
// mongoose.connect(mongoDB, options, (err, res) => {
//   if (err) {
//     console.log('MongoDB Connection Failed');
//   } if (res) {
//     console.log('MongoDB Connected');
//   }
// });

const signup = require('./routes/signup');
const login = require('./routes/login');
const restProfile = require('./routes/restaurant/restProfile');
const custProfile = require('./routes/customer/custProfile');

app.use('/signup', signup);
app.use('/login', login);
app.use('/profiles/restaurants', restProfile);
app.use('/profiles/customers', custProfile);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
