const query = require("../util/query");
const sql = `create table if not exists loan_aplicationes(
  aplicationID int primary key auto_increment,
  custID int not null,
  type_id int not null,
  requestedamount int not null,
  aplication_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  suporting_documents LONGBLOB,
  aplication_status varchar(200),
  CONSTRAINT fk_customer FOREIGN KEY (custID) REFERENCES customers(customerID),
  CONSTRAINT fk_types FOREIGN KEY (type_id) REFERENCES loan_types(loanaccID)
);`;

const get = async (req, res) => {
  const name = req.query.custID;

  if (name) {
    try {
      const listoflon = await query(
        `select * from loan_aplicationes where custID=${custID}`
      );
      res.json(listoflon.data)
    } catch (err) {
      console.error(err);
    }
  }
  try{
    const list = await query(`select * from loan_aplicationes`)
    res.json(list)
  }catch(err){
    console.error(err)
  }
};
//update branch
const put = async (req, res) => {
  console.log(req.body);
  if (
    !req.body.custID ||
    !req.body.type_id ||
    !req.body.requestedamount ||
    !req.body.suporting_documents ||
    !req.body.aplication_status
  ) {
    return res.status(400).send("Missing required fields in request body");
  }
  try {
    const sql = `UPDATE loan_aplicationes 
    SET  custID = ?, type_id = ?, requestedamount = ?, 
    suporting_documents = ?, aplication_status =?, 
    WHERE aplicationID = ?`;
    const values = [
      req.body.custID,
      req.body.type_id,
      req.body.requestedamount,
      req.body.suporting_documents,
      req.body.aplication_status,
      parseInt(req.params.id),
    ];
    const result = await query(sql, values);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send("loan_aplicationes with the given ID not found");
    }
    res.status(200).send({ message: "loan_aplicationes updated successfully" });
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
    !req.body.type_id ||
    !req.body.requestedamount ||
    !req.body.suporting_documents ||
    !req.body.aplication_status
  ) {
    return res.status(400).send("Missing required fields in request body");
  }

  try {
    const sql = `INSERT INTO loan_aplicationes 
    (custID, type_id, requestedamount, suporting_documents, aplication_status) VALUES(?, ?, ?, ?, ?)`;
    const values = [
      req.body.custID,
      req.body.type_id,
      req.body.requestedamount,
      req.body.suporting_documents,
      req.body.aplication_status,
    ];
    const result = await query(sql, values);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send("loan_aplicationes with the given ID not found");
    }
    res.status(200).send({ message: "loan_aplicationes updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

module.exports.get = get;
module.exports.put = put;
module.exports.post = post;
