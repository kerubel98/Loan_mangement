const query = require("../util/query");
const hashedPassword = require("../util/hash");

const get = async (req, res) => {
  const sql = `create table if not exists users(
        userID int primary key auto_increment,
        branchID int not null,
        name varchar(255) not null,
        password varchar(200) not null,
        email varchar(120) not null unique,
        role varchar(120) not null,
        CONSTRAINT fk_user FOREIGN KEY (branchID) REFERENCES beranch(id)
    );`;
  const customer = await query(sql);
  if (customer) {
    query(`select * from users`).then((resl) => res.send(resl));
    console.log(customer);
  }
};
//update branch
const put = async (req, res) => {
  console.log(req.body);
  if (
    !req.body.branchID ||
    !req.body.name ||
    !req.body.password ||
    !req.body.email ||
    !req.body.role
  ) {
    return res.status(400).send("Missing required fields in request body");
  }
  try {
    const sql = `UPDATE users 
      SET  branchID = ?, name = ?, password = ?, 
      email = ?, role =?, 
      WHERE aplicationID = ?`;
    const values = [
      req.body.branchID,
      req.body.name,
      req.body.password,
      req.body.email,
      req.body.role,
      parseInt(req.params.id),
    ];
    const result = await query(sql, values);
    if (result.affectedRows === 0) {
      return res.status(404).send("users with the given ID not found");
    }
    res.status(200).send({ message: "users updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
//creat new branch
const post = async (req, res) => {
  const password = req.body.password;
  if (
    !req.body.branchID ||
    !req.body.name ||
    !req.body.password ||
    !req.body.email ||
    !req.body.role
  ) {
    return res.status(400).send("Missing required fields in request body");
  }
  const hashpasword = await hashedPassword(password);

  try {
    const sql = `INSERT INTO users 
      (branchID, name, password, email, role) VALUES(?, ?, ?, ?, ?)`;
    const values = [
      req.body.branchID,
      req.body.name,
      hashpasword,
      req.body.email,
      req.body.role,
    ];
    const result = await query(sql, values);
    if (result.affectedRows === 0) {
      return res.status(404).send("users with the given ID not found");
    }
    res.status(200).send({ message: "users updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

module.exports.get = get;
module.exports.put = put;
module.exports.post = post;
