const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const authRoute = require('./routes/authRoute');
const accountRoute = require('./routes/accountRoute');
const accountGroupRoute = require('./routes/accountGroupRoute');
const accountTypeRoute = require('./routes/accountTypeRoute');
const branchRoute = require('./routes/branchRoute');
const currencyRoute = require('./routes/currencyRoute');
const costRoute = require('./routes/costRoute');
const yearRoute = require('./routes/yearRoute');
const jounralRoute = require('./routes/journalRoute');
const invoiceRoute = require('./routes/invoiceRoute');
const jounraEntrylRoute = require('./routes/jounralEntryRoute');
const profitLossRoute = require('./routes/profitLoosRout');
const trialBalanceRoute = require('./routes/trialBalanceRoute');
const balanceSheetRoute = require('./routes/balanceSheetRoute');
const openingBalanceRoute = require('./routes/openingBalanceRoute');


app.use('/api/auth', authRoute);
app.use('/api/account', accountRoute);
app.use('/api/account-group', accountGroupRoute);
app.use('/api/account-type', accountTypeRoute);
app.use('/api/currency', currencyRoute);
app.use('/api/branch', branchRoute);
app.use('/api/cost-center', costRoute);
app.use('/api/year', yearRoute);
app.use('/api/jounral', jounralRoute);
app.use('/api/invoice', invoiceRoute);
app.use('/api/jounral-entry', jounraEntrylRoute);
app.use('/api/profit-loss', profitLossRoute);
app.use('/api/trial-balance', trialBalanceRoute);
app.use('/api/balance-sheet', balanceSheetRoute);
app.use('/api/opening-balance', openingBalanceRoute);


app.get('/', (req, res) => {
    return res.send({
        message: "Welcome To Express js"
    })
});
app.listen(port, (req, res) => {
    console.log(`Servre Running In http://localhost:${port}`);
});

