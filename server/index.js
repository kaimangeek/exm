const express = require('express');
const sequelize = require('./db.js');
const cors = require('cors');
const router = require('./routes/index.js');
const errorHadler = require('./middleware/ErrorHandlingMiddleware.js');

const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(errorHadler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();
