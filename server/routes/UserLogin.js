const { Connection, Request } = require("tedious");
module.exports = (req, res) => {
 
console.log("BJDsajdasjdhsdjk");
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
    queryDatabase();
  }
});

function queryDatabase() {

  var map = new Map();
  console.log("Reading rows from the Table...");

  // Read all rows from table
  const request = new Request(
    `SELECT *
     FROM [dbo].[nadi_nadiregistration]`,
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
 map.set(column.metadata.colName, column.value)
 const obj = mapToObj(map)
 const object = JSON.stringify(obj)
      console.log("%s\t%s", object);
    });
  });

  connection.execSql(request);
}

function mapToObj(inputMap) {
    let obj = {};

    inputMap.forEach(function(value, key){
        obj[key] = value
    });

    return obj;
}

};
