const mysql = require('mysql2')

const singleton = (function () {
    var config;
  
    function intializeconfig(values) {
      this.host = values.host;
      this.user = values.user;
      this.password = values.password;
      this.database = values.database;
    }
  
    return {
      getconfig: function (values) {
        if (!values && config !== undefined) {
          return config;
        }
        if (config === undefined) {
          config = new intializeconfig(values);
        }
        const connaction = mysql.createConnection(config);
        return connaction;
      },
    };
  })();

  module.exports = singleton