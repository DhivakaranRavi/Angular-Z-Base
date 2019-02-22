const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = express.Router();
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'X-Requested-With,content-type',
    optionsSuccessStatus: 204,
    preflightContinue: false,
    credentials: true,
  }),
);

app.use(morgan('dev'));

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));
app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(port, () => {
  console.log('Listening on port 3000');
});
