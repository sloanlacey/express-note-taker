const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

require('./routing/html-routes.js')(app);

app.listen(PORT, function() {
    console.log('App listening on PORT: ' + PORT);
})
