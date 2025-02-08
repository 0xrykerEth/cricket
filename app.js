const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const home = require('./routes/home')
const profile = require('./routes/profile')
const update = require('./routes/update')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(update);
app.use(profile);
app.use(home);

const port = 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log("Server is listening at port 3000")
})