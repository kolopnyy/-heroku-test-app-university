const express = require('express');
const app = express();

if (process.env.LE_URL && process.env.LE_CONTENT) {
  app.get(process.env.LE_URL, function(req, res) {
    return res.send(process.env.LE_CONTENT)
  });
}
 
app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello server is running')
    .end();
});
 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(App listening on port ${PORT});
  console.log('Press Ctrl+C to quit.');
});

if (process.env.NODE_ENV === 'production') {
  app.use(function(req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https' && req.path !== process.env.LE_URL) {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
  });
}