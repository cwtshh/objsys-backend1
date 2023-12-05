require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 5000;
const frontEndPort = process.env.FRONT_END_PORT || 3000;
const app = express();

// configuracoes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors
app.use(cors({credentials: true, origin: `http://localhost:${frontEndPort}`}));

// banco
require('./config/db.js');

// rotas
const router = require('./routes/Router.js');
app.use(router);

// rota teste
router.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
