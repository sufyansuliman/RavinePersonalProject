const express = require("express");
const path = require("path");

//Initialize Express object
const app = express();

//Setting static folder
app.use(express.static(path.join(__dirname, "client")));

//App listening 
app.listen(3000, () => {
    console.log("Server running on port 3000");
})
