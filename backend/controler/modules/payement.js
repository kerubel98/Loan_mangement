const query = require("../util/query");

const get = async (req, res) => {
  const sql = `create table if not exists payments(
        pymentID int primary key auto_increment,
        accountnumber int not null,
        pymentDate TIMESTAMP UNIQUE DEFAULT CURRENT_TIMESTAMP,
        pyementAmount varchar(200) not null,
        description varchar(120) not null,
        CONSTRAINT fk_accountInfo FOREIGN KEY (accountnumber) REFERENCES account_informations(accountNumber)
    );`;
  const customer = await query(sql);
  if (customer) {
    query(`select * from payments`).then((resl) => res.send(resl));
    console.log(customer);
  }
};
//update branch
const put = async (req, res) => {
  console.log(req.body);
  if (
    !req.body.accountnumber ||
    !req.body.pyementAmount ||
    !req.body.description
  ) {
    return res.status(400).send("Missing required fields in request body");
  }
  try {
    const sql = `UPDATE payments 
      SET  accountnumber = ?, pymentDate = ?, pyementAmount = ?, 
      description = ?
      WHERE aplicationID = ?`;
    const values = [
      req.body.accountnumber,
      req.body.pyementAmount,
      req.body.description,
      ,
      parseInt(req.params.id),
    ];
    const result = await query(sql, values);
    if (result.affectedRows === 0) {
      return res.status(404).send("payments with the given ID not found");
    }
    res.status(200).send({ message: "payments updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
//creat new branch
const post = async (req, res) => {
  if (
    !req.body.accountnumber ||
    !req.body.pyementAmount ||
    !req.body.description
  ) {
    return res.status(400).send("Missing required fields in request body");
  }

  try {
    const sql1 = `select balance from account_informations WHERE accountnumber = ?`;
    const sql = `INSERT INTO payments 
      (accountnumber, pyementAmount, description) VALUES(?, ?, ?)`;

    const sql2 = `UPDATE account_informations 
      SET balance = ?
      WHERE accountnumber = ?`;

    const values = [req.body.accountnumber, req.body.pyementAmount, req.body.description];

    const balance = await query(sql1, req.body.accountnumber);
    const result = await query(sql, values);
    const oldb = parseFloat(balance[0].balance)
    const updatbalce = await query(sql2, [(oldb + parseFloat(req.body.pyementAmount)), req.body.accountnumber])
    if (result.affectedRows === 0) {
      return res.status(404).send("payments with the given ID not found");
    }
    res.status(200).send({ message: "payments updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

module.exports.get = get;
module.exports.put = put;
module.exports.post = post;
