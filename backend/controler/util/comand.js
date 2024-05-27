var invoker = {
  'query': function (connaction, sql, values) {
    return new Promise((resolve, reject) => {
        connaction.query(sql, values, (err, result, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
},
  'end': function (connaction) {
    return connaction.end((err) => {
      if (err) {
        console.log("couled not end");
      }
    });
  },
};

var mager = {
  execute: function (name, args) {
      if (name in invoker) {
        return invoker[name].apply(invoker, [].slice.call(arguments, 1));
      }

      return false;
  },
};

module.exports = mager;
