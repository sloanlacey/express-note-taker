const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;
 
app.get('/', function (req, res) {
  res.send('Hello World')
});
 
app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))
});

app.listen(PORT, function() {
    console.log('App listening on PORT: ' + PORT);
})
