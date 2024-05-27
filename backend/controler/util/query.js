const mager = require("./comand");
const singleton = require("./connect");

const connaction = singleton.getconfig({
  host: "localhost",
  user: "root",
  password: "123",
  database: "demo",
});

function queryexcut(sql, values) {
  return new Promise((resolve, reject) => {
    connaction.connect((err) => {
      if (err) {
        reject(err);
      }
      const result = mager
        .execute("query", connaction, sql, values)
        .then((result) => {
          console.log(result);
          resolve(result)
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

module.exports = queryexcut;
