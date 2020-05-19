const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.post("/userLogin", require('./routes/logindata'));
app.post("/getdata", require('./routes/getData'));
app.post("/pickle", require("./routes/userHondalogin"));
app.listen(port, (req,res) => {
    console.log("Server is running on "+ port + " port");
});
