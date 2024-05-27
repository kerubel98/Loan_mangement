const query = require("../util/query");

const get = async (req, res) => {
  const sql = `create table if not exists loan_accountes(
    accountNumb int not null primary key,
    aplicationID int UNIQUE,
    user_ID int not null,
    
    CONSTRAINT fk_acountinfo FOREIGN KEY (accountNumb) REFERENCES account_informations(accountNumber),
    CONSTRAINT fk_apliction FOREIGN KEY (aplicationID) REFERENCES loan_aplicationes(aplicationID),
    CONSTRAINT fk_user_ac FOREIGN KEY (user_ID) REFERENCES users(userID)
);`
  const customer = await query(sql);
  if (customer) {
    query(`select accountNumb from loan_accountes`).then((resl) => res.send(resl));
    console.log(customer);
  }
};
//update branch
const put = async (req, res) => {
  console.log(req.body);
  if (
    !req.body.accountNumb ||
    !req.body.aplicationID ||
    !req.body.user_ID
     
  ) {
    return res.status(400).send("Missing required fields in request body");
  }
  try {
    const sql = `UPDATE loan_accountes SET accountNumb = ?, aplicationID = ?, user_ID = ?,  VA WHERE customerID = ?`;
    const values = [
      req.body.accountNumb,
      req.body.aplicationID,
      req.body.user_ID,
     ,
      parseInt(req.params.id),
    ];
    const result = await query(sql, values);
    if (result.affectedRows === 0) {
      return res.status(404).send("loan_accountes with the given ID not found");
    }
    res.status(200).send({ message: "loan_accountes updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
//creat new branch
const post = async (req, res) => {
    console.log(req.body)
  if (
    !req.body.accountNumb ||
    !req.body.aplicationID ||
    !req.body.user_ID
     
  ) {
    return res.status(400).send("Missing required fields in request body");
  }

  try {
    const sql = `INSERT INTO loan_accountes (accountNumb, aplicationID, user_ID) VALUES(?, ?, ?)`;
    const values = [req.body.accountNumb, req.body.aplicationID, req.body.user_ID, ];
    const result = await query(sql, values);
    if (result.affectedRows === 0) {
      return res.status(404).send("loan_accountes with the given ID not found");
    }
    res.status(200).send({ message: "loan_accountes updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

module.exports.get = get;
module.exports.put = put;
module.exports.post = post;
