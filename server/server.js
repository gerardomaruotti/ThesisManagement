const { app, port } = require('./index.js');

app.listen(port, () => {
    console.log(`react-qa-server listening at http://localhost:${port}`);
  });