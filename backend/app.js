const express = require('express');
const { env } = require('process');
const app = express();
const PORT = env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        data: {}
    });
});

app.use('/customers', require('./routes/customer.route'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});