require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');

const route = require('./routes');
const db = require('./config/db');
const app = express();
const port = 3000;

db.connect();
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'));

route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
