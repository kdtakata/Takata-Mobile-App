const { Connection, Request } = require("tedious");
const azure = require('azure-storage');

var moment = require('moment')
module.exports = (req, res) => {
  //  console.log("PVT HOnda User Registration", req.body);
    var image1name = req.body.vin + '-image1.jpg';
    var image2name = req.body.vin + '-image2.jpg' ;
    var rawimage1 = req.body.image1;
console.log('Site is',req.body.site);
console.log('VIN is',req.body.vin);
console.log('user is',req.body.user);
console.log('user is',req.body.type);
    //console.log('Image',req.body.image1);
    var rawimage2 = req.body.image2;
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
    let today = Date.now('Melbourne');
    
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
   


    
let today = Date.now('Melbourne');
console.log('Site is',req.body.site);
console.log('VIN is',req.body.vin);
console.log('user is',req.body.user);

    const request = new Request(
      `INSERT INTO dbo.takata_Images (vin,img1,img2,tmst,status,bid,userid,removal_type) Values ('`+req.body.vin+`','`+image1name+`','`+image2name+`','`+today+`','Inflator Removed','`+req.body.site +`','`+req.body.user+`','`+req.body.type+`')`,
      (err) => {
        if (err) {
          console.error(err.message);
        } else {
            console.log("Successful");
            main().catch((err) => {
              console.error("Error running sample:", err.message);
            });
            
          
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

  async function main() {

  const blobServiceClient = new azure.createBlobService("djangodevdiag","Y5k5ahE0d1gVlZ8HkeUkG/l3wUd1/f4dApWmS8ua+fi7fxLBI/eqkbMQVPlu1m9uAFXTNQufgja+fSWrVuYTzQ==");
  
    var type = 'image/jpeg';
    
    //console.log(req.body.image1);
    var buffer = new Buffer.from(rawimage1,'base64');
    var buffer2 = new Buffer.from(rawimage2,'base64');
    // var buffer3 = getStream(rawimage1);
    // var buffer4 = getStream(rawimage2);
    console.log("Buffer Completed");
    await blobServiceClient.createBlockBlobFromText("takata-images",image1name,buffer,{contentType:type}, function(error, result, response){
      if (error) {
          console.log(error);
      }else{
       console.log(result);
      }
    });
   
    await blobServiceClient.createBlockBlobFromText("takata-images",image2name,buffer2,{contentType:type}, function(error, result, response){
      if (error) {
          console.log(error);
      }else{
       console.log(result);
      }
    });
 

    res.status(200).send("Suceess");
  }

}

