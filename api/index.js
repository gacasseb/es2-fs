require('./src/config/database');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

const projectRouter = require('./src/router/project');
const memberRouter = require('./src/router/member');
const teamRouter = require('./src/router/team');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/projeto', projectRouter);
app.use('/profissional', memberRouter);
app.use('/time', teamRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
