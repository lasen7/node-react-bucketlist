import express from 'express';

import api from './routes';

const app = express();
const port = process.env.PORT || 3000;

// setup router
app.use('/api', api);

// handle error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    msg: err.message
  });
});

app.listen(port, () => {
  console.log('Server start port on ', port);
});