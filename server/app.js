const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const routes = require('./v1/routes');

const {
  handle404s,
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require('./v1/helpers/errorHelper');

const appV1 = express();
appV1.use(express.json());
appV1.use(cors());
dotenv.config();

appV1.use('/api/v1', routes);
appV1.get('*', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome To MTH Version 1',
  });
});

appV1.all('*', handle404s);
appV1.use(handleCustomErrors);
appV1.use(handlePsqlErrors);
appV1.use(handleServerErrors);

appV1.listen(process.env.PORT || 9000, (error) => {
  if (error) console.log('Server Error', error);
  else console.log('Server Started & Listening on', process.env.PORT || 9000);
});

module.exports = appV1;
