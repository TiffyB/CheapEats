// server

const express = require('express')
const app = express();

app.get('/', (req, res) => res.send('Cheap Eats'));

app.listen(8080);
