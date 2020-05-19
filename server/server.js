const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));


app.post("/getdata", require("./routes/UserLogin"));


app.listen(port, (req,res) => {
    console.log("Server is running on "+ port +" port");
});
