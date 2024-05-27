const express = require("express");
const branch = require('../backend/routes/branch')
const bodyParser = require('body-parser');
const customer = require('../backend/routes/customer')
const accountes = require('../backend/routes/accountinfo')
const types = require('../backend/routes/loantypes')
const loanapplication = require('../backend/routes/loanapplication')
const user = require("../backend/routes/user")
const loan_account = require('../backend/routes/loanaccount')
const pyment = require('../backend/routes/payment')
const cors = require('cors')

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.use('/api/beranch', branch)
app.use('/api/customers', customer)
app.use('/api/acountes', accountes)
app.use('/api/loantypes', types)
app.use('/api/loanaplication', loanapplication)
app.use('/api/user', user)
app.use('/api/loanaccount', loan_account)
app.use('/api/payemt', pyment)


app.listen(4000, () => console.log("serving on port 4000"));
