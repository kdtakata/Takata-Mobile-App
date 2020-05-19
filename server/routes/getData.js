const { Connection, Request } = require("tedious");

module.exports = async (req, res) => {
  var Map = require("collections/Map");
  var Dict = require("collections/dict");
  var dict = new Dict();
  // Create connection to database
  const config = {
    authentication: {
      options: {
        userName: "takata_prafull",
        password: "Vinwash001"
      },
      type: "default"
    },
    server: "devdjango.database.windows.net",
    options: {
      database: "takata_dev_db",
      encrypt: true
    }
  };

  const connection = new Connection(config);

  // Attempt to connect and execute queries if connection goes through
  connection.on("connect", err => {
    if (err) {
      console.error(err.message);
    } else {
      queryDatabase().then(console.log("Dictionary", dict));
    }
  });

  async function queryDatabase() {
    var map = new Map();

    console.log("Reading rows from the Table...");

    // Read all rows from table
    const request = new Request(
      `SELECT *
       FROM [dbo].[business_star_nadi]`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`${rowCount} row(s) returned`);
        }
      }
    );

    request.on("row", columns => {
      columns.forEach(column => {
        map.add(column.value, column.metadata.colName);
        var obj = mapToObj(map);
        jsonP = JSON.stringify(obj);

        for (var entry of map.entries()) {
          var key = entry[0],
            value = entry[1];
          dict.add(value, key);
        }
      });
    });

   await connection.execSql(request);
   return
  }

  function mapToObj(inputMap) {
    let obj = {};

    inputMap.forEach(function(value, key) {
      obj[key] = value;
    });

    return obj;
  }
};
