const { Connection, Request } = require("tedious");
const azure = require("azure-storage");
var moment = require("moment");
const fetch = require("node-fetch");
module.exports = async (req, res) => {
  //  console.log("PVT HOnda User Registration", req.body);
  var system = "NEW MOBILE";
  console.log("Username is", req.body);
  var totalrecord;

  //console.log('Image',req.body.image1);
  await fetch("https://www.takatavinview.com/business/records/")
    .then(response => response.json())
    .then(responsJson => {
      console.log(responsJson[0].Total_records);
      totalrecord = parseInt(responsJson[0].Total_records) + 1 ;
    });

  const config = {
    authentication: {
      options: {
        userName: "takata_prafull", // update me
        password: "Vinwash001" // update me
      },
      type: "default"
    },
    server: "devdjango.database.windows.net", // update me
    options: {
      database: "takata_dev_db", //update me
      encrypt: true
    }
  };
  const connection = new Connection(config);
  let today = Date.now("Melbourne");
  console.log(today);
  connection.on("connect", err => {
    if (err) {
      console.error("Connection error".err.message);
    } else {
      console.log("Success");
       queryDatabase();
    }
  });

  function queryDatabase() {
    const request = new Request(
      `INSERT INTO dbo.takata_business_star_nadi (id,system,business_name,Trading_name,abn,street,city,state,postcode,business_email,business_phone,fax,website,title,first_name,last_name,email,mobile,account_name,bsb,account_no,userid) Values ('` +
        totalrecord +
        `','` +
        system +
        `','` +
        req.body.business +
        `','` +
        req.body.trading +
        `','` +
        req.body.abn +
        `','` +
        req.body.street +
        `','` +
        req.body.city +
        `','` +
        req.body.state +
        `','` +
        req.body.postcode +
        `','` +
        req.body.bemail +
        `','` +
        req.body.bphone +
        `','` +
        req.body.fax +
        `','` +
        req.body.website +
        `','` +
        ' '+
        `','` +
        req.body.fname +
        `','` +
        req.body.lname +
        `','` +
        req.body.email +
        `','` +
        req.body.mob +
        `','` +
        req.body.accname +
        `','` +
        req.body.bsb +
        `','` +
        req.body.accno +
        `','` +
        req.body.userid +
        `')`,
      err => {
        if (err) {
          console.error(err.message);
        } else {
          console.log("Successful");
          res.status(200).send("Successful");
        }
      }
    );

    request.on("row", columns => {
      columns.forEach(column => {
        console.log("%s\t%s", column.metadata.colName, column.value);
      });
    });

    connection.execSql(request);
  }
};
