const { Connection, Request } = require("tedious");

module.exports = (req,res) => {
   
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

async function queryDatabase() {


  console.log("Reading rows from the Table...");

  // Read all rows from table
  const request =await new Request(
    `SELECT *
     FROM [dbo].[takata_user_registration] where password = '` + req.body.password + `' and username ='` + req.body.username +`'` ,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
          if(rowCount == 1){
            
          }else{
              res.status(200).send("NotAuthorized");
          }
          
      }
    }
  );
  let data={
    id: '',
    bid: '',
  }
  request.on("row", columns => {
    columns.forEach(column =>{
      console.log("%s\t%s", column.metadata.colName, column.value)
      if(column.metadata.colName === "id"){
        data.id = column.value
      }
      if(column.metadata.colName === "bid"){
        data.bid = column.value
        res.status(200).send(data);
      }
    })
  })
  connection.execSql(request);
}

}