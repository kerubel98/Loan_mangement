const query = require("../util/query");
// const sql = `
//   CREATE TABLE IF NOT EXISTS account_informations (
//     accountNumber INT PRIMARY KEY AUTO_INCREMENT,
//     custID INT NOT NULL,
//     branchID INT NOT NULL,
//     type VARCHAR(12) NOT NULL,
//     balance DECIMAL(10,2) DEFAULT 0.00,
//     CONSTRAINT fk_accounts FOREIGN KEY (custID) REFERENCES customers(customerID),
//     CONSTRAINT fk_branches FOREIGN KEY (branchID) REFERENCES beranch(id)
//   );

const get = async (req, res) => {
  const ID = req.params.ID;
  const name = req.query.name;
  if (ID) {
    try {
      const customeracInfo = await query(
        `select * from account_informations where custID=${ID}`
      );
    } catch (err) {
      console.log(err);
    }
  }

  if (name) {
    try {
      const custmer = await query(
        `select custumerID from customers where name=${name}`
      );
      res.json(custmer);
    } catch (err) {
      console.error(err);
    }
  }
};
//update branch
const put = async (req, res) => {
  console.log(req.body);
  if (
    !req.body.custID ||
    !req.body.branchID ||
    !req.body.type ||
    !req.body.balance
  ) {
    return res.status(400).send("Missing required fields in request body");
  }
  try {
    const sql = `UPDATE account_informations SET customerID = ?, id = ?, type = ?, balance = ? WHERE accountNumber = ?`;
    const values = [
      req.body.custID,
      req.body.branchID,
      req.body.type,
      req.body.balance,
      parseInt(req.params.id),
    ];
    const result = await query(sql, values);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send("account_informations with the given ID not found");
    }
    res
      .status(200)
      .send({ message: "account_informations updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
//creat new branch
const post = async (req, res) => {
  console.log(req.body);
  if (
    !req.body.custID ||
    !req.body.branchID ||
    !req.body.type ||
    !req.body.balance
  ) {
    return res.status(400).send("Missing required fields in request body");
  }

  try {
    const sql = `INSERT INTO account_informations (custID, branchID, type, balance) VALUES(?, ?, ?, ?)`;
    const values = [
      req.body.custID,
      req.body.branchID,
      req.body.type,
      req.body.balance,
    ];
    const result = await query(sql, values);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send("account_informations with the given ID not found");
    }
    res
      .status(200)
      .send({ message: "account_informations updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

module.exports.get = get;
module.exports.put = put;
module.exports.post = post;
