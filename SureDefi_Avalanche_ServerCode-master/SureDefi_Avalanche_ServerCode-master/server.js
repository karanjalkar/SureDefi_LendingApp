const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5185;

//app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
  });


const evmRoutesApi = require('./routes/evm-routes');
const ethRoutesApi = require('./routes/eth-routes');
const defiRoutesApi = require('./routes/defi-routes');

app.use('/evm', evmRoutesApi);
app.use('/eth', ethRoutesApi);
app.use('/defi', defiRoutesApi);

app.listen(port, () => {
    console.log(`server is listning on port ${port}`);
});