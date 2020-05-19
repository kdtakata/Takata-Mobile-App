const { Connection, Request } = require("tedious");

module.exports = (req,res) => {
    console.log(req)
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
    //queryDatabase();
  }
});

async function queryDatabase() {


  console.log("Reading rows from the Table...");

  // Read all rows from table
  const request =await new Request(
    `SELECT *
     FROM [dbo].[nadi_nadiregistration] where password = '` + req.body.password + `' and username ='` + req.body.username `'` ,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
          if(rowCount == 1){
            res.status(200).send("Authorized");
          }else{
              res.status(404);
          }
          
      }
    }
  );
 
  
  connection.execSql(request);
}

}