const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const cors = require("cors");
const fs = require("fs");
const path =require("path");

    // MongoDB

      mongoose.connect("mongodb+srv://admin:admin@amancluster0.hxvb8xl.mongodb.net/myemployees-backend?retryWrites=true&w=majority&appName=AmanCluster0", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }).then(() => console.log("Connected to DB"))
      .catch(err => console.error("DB Connection Error:", err));

// initialising directories
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}

const app = express();
const port = 4444;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Setting up middlewares
app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());



// Routing
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));

app.use(express.static(path.join(__dirname,"./frontend/build")));

app.get('*',function(_, res){
    res.sendFile(path.join(__dirname, "./frontend/build/index.html"), function(err){
        res.status(500).send(err);
    })
})

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
