// server

const express = require('express')
const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Cheap Eats'));

app.listen(PORT);
