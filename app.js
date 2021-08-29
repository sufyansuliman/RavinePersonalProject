const express = require("express");
const path = require("path");
const scraping = require("./server/models/scraping.js");

//Initialize Express object
const app = express();

var data = [];

//Setting static folder
app.use(express.static("client/templates"));
app.use(express.static("client"));
app.use(express.json());

app.get("/api", (req, res) =>{
        var data=[]
        axios.get("https://www." + bra + ".com/" + gen + "/" + art).then(urlResponse => {
            let $ = cheerio.load(urlResponse.data);
            $("div.product-item-info").each((i, element) => {
                var names = $(element).find('a.product-item-link').text();
                names = names.split(",") 
                data.push(names)
            }) 
            console.log("scraping", data)
        })
})


//App listening 
app.listen(3000, () => {
    console.log("Server running on port 3000");
})
