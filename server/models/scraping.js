const cheerio = require('cheerio');
const axios = require('axios');
const fs = require("fs");

var filtersExample = {
    "brand": ["Champion"],
    "article" : ["Pants"],
    "gender": ["Women"]
};


module.exports = {
    scrapeData : function scrapeData(filt){
        var gen = filt["gender"]
        var art = filt["article"]
        var bra = filt["brand"]
        console.log(gen, art, bra)
        if (bra == "Champion"){
            if (art == "Pants"){
                art = "bottoms.html"
            }
            if (art == "Shirts"){
                art = "tops.html?silhouette=9814"
            }
        }
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
    }
}
        
