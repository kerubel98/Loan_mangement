const query = require("../util/query");

  const sql = `create table if not exists customers(
    customerID int primary key auto_increment,
    name varchar(255) not null,
    adderess varchar(200) not null,
    phone_number varchar(12) not null unique,
    yearly_income int not null
);`

const get = async (req, res) => {
  const name = req.query.name;
  const ID = req.params.ID;
  console.log("from express", ID, name)

  if (name) {
    try {
      const customerID = await query(
        `select customerID from customers where name=${name}`
      );
      const det = customerID;
      res.send(det);
    } catch (err) {
      console.error(err);
    }
  } else if (ID) {
    try {
      const customerID = await query(
        `select * from customers where customerID=${ID}`
      );
      const det = [name, customerID];
      res.json(det.data);
    } catch (err) {
      console.error(err);
    }
  }else {
    try {
      const lists = await query(
        `select * from customers`
      );
      
      res.json(lists);
    } catch (err) {
      console.error(err);
    }
  }
  
    
  
};
//update branch

const put = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.adderess ||
    !req.body.phone_number ||
    !req.body.yearly_income
  ) {
    return res.status(400).send("Missing required fields in request body");
  }
  try {
    const sql = `UPDATE customers SET name = ?, adderess = ?, phone_number = ?, yearly_income = ? WHERE customerID = ?`;
    const values = [
      req.body.name,
      req.body.adderess,
      req.body.phone_number,
      req.body.yearly_income,
      parseInt(req.params.id),
    ];
    const result = await query(sql, values);
    if (result.affectedRows === 0) {
      return res.status(404).send("customers with the given ID not found");
    }
    res.status(200).send({ message: "customers updated successfully" });
    console.log("successs");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
//creat new branch
const post = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.adderess ||
    !req.body.phone_number ||
    !req.body.yearly_income
  ) {
    return res.status(400).send("Missing required fields in request body");
  }

  try {
    const sql = `INSERT INTO customers (name, adderess, phone_number, yearly_income) VALUES(?, ?, ?, ?)`;
    const values = [
      req.body.name,
      req.body.adderess,
      req.body.phone_number,
      req.body.yearly_income,
    ];
    const result = await query(sql, values);
    res.status(200).send({ message: "customers updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

module.exports.get = get;
module.exports.put = put;
module.exports.post = post;
