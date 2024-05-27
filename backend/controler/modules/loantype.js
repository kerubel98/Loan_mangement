const query = require("../util/query");

const sql = `create table if not exists loan_types(
  loanaccID int primary key auto_increment,
  name varchar(200) not null,
  description varchar(200) not null,
  interst int not null,
  max_amount int NOT NULL,
  duration int not null,
  colateral varchar(200)
  
);`;

const get = async (req, res) => {
  
  const name = req.query.name
  const ID = req.params.ID
  console.log(req.body)
  if (ID) {
    try {
      const list = await query(`select * from loan_types where loanaccID=${ID}`);
      res.send(list)
      console.log(list);
    } catch (err) {
      console.log(err);
    }
  }
  
  if (name) {
    try {
      const loanaccID = await query(`select loanaccID from loan_types where name=${name}`);
      res.send(loanaccID)
      console.log(loanaccID);
    } catch (err) {
      console.log(err);
    }
  }
};
//update branch
const put = async (req, res) => {
  console.log(req.body);
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.interst ||
    !req.body.max_amount ||
    !req.body.duration ||
    !req.body.colateral
  ) {
    return res.status(400).send("Missing required fields in request body");
  }
  try {
    const sql = `UPDATE loan_types 
    SET  name = ?, description = ?, interst = ?, 
    max_amount = ?, duration =?, colateral=?
    WHERE aplicationID = ?`;
    const values = [
      req.body.name,
      req.body.description,
      req.body.interst,
      req.body.max_amount,
      req.body.duration,
      req.body.colateral,
      parseInt(req.params.id),
    ];
    const result = await query(sql, values);
    if (result.affectedRows === 0) {
      return res.status(404).send("loan_types with the given ID not found");
    }
    res.status(200).send({ message: "loan_types updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
//creat new branch
const post = async (req, res) => {
  console.log(req.body);
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.interst ||
    !req.body.max_amount ||
    !req.body.duration ||
    !req.body.colateral
  ) {
    return res.status(400).send("Missing required fields in request body");
  }

  try {
    const sql = `INSERT INTO loan_types 
    (name, description, interst, max_amount, duration, colateral) VALUES(?, ?, ?, ?, ?, ?)`;
    const values = [
      req.body.name,
      req.body.description,
      req.body.interst,
      req.body.max_amount,
      req.body.duration,
      req.body.colateral,
    ];
    const result = await query(sql, values);
    if (result.affectedRows === 0) {
      return res.status(404).send("loan_types with the given ID not found");
    }
    res.status(200).send({ message: "loan_types updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

module.exports.get = get;
module.exports.put = put;
module.exports.post = post;
