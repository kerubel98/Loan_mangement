const query = require("../util/query");

const get = async (req, res) => {
  query(`select * from beranch`).then((resl) => res.send(resl));
};
//update branch
const put = async (req, res) => {
  console.log(req.body);
  if (!req.body.name || !req.body.grade) {
    return res.status(400).send("Missing required fields in request body");
  }
  try {
    const sql = `UPDATE beranch SET name = ?, grade = ? WHERE id = ?`;
    const values = [req.body.name, req.body.grade, parseInt(req.params.id)];
    const result = await query(sql, values);
    if (result.affectedRows === 0) {
      return res.status(404).send("Branch with the given ID not found");
    }
    res.status(200).send({ message: "Branch updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
//creat new branch
const post = async (req, res) => {
  if (!req.body.name || !req.body.grade) {
    return res.status(400).send("Missing required fields in request body");
  }

  try {
    const sql = `INSERT INTO beranch (name, grade) VALUES(?, ?)`;
    const values = [req.body.name, req.body.grade];
    const result = await query(sql, values);
    if (result.affectedRows === 0) {
      return res.status(404).send("Branch with the given ID not found");
    }
    res.status(200).send({ message: "Branch updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

module.exports.get = get;
module.exports.put = put;
module.exports.post = post;
