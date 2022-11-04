let express = require('express'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  database = require('./database'),
  createError = require('http-error');

// Connect mongoDB

mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  

}).then(() => {
    console.log("Database connected");
  },
  error => {
    console.log("Database could't be connected to: " + error);
  }
);

const clientAPI = require('../backend/routes/client.route');
const app = express();



app.use(express.json());
app.use(express.urlencoded({
  extended: false,
  mergeParams: true
}));
app.use(cors());

// API
app.use('/api/', clientAPI);

// Create port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Connected to port ' + port);
});

// Find 404
app.use((req, res, next) => {
  console.log(123)
  next(createError(404));
});


// error handler
app.use(function (err, req, res) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});