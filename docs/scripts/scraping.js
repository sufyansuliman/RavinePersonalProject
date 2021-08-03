const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
//This is here for now until I am able to import the actual filters that are selected on the page
var filtersExample = {
    "brand": ["Champion"],
    "article" : ["Pants"],
    "gender": ["Women"]
};

var data = {
    "products": []
};

function scrape(filt){
    var gen = filt["gender"]
    var art = filt["article"]
    var bra = filt["brand"]
    console.log(gen, art, bra)
    if (art == "Pants"){
        art = "bottoms.html"
    }
    if (art == "Shirts"){
        art = "tops.html?silhouette=9814"
    }
    axios.get("https://www." + bra + ".com/" + gen + "/" + art).then(urlResponse => {
        let $ = cheerio.load(urlResponse.data);
        $("div.product-item-info").each((i, element) => {
            var names = $(element).find('a.product-item-link').text();
            names = names.split(",") 
            data["products"].push(names)
        })  
        console.log("Products:", data["products"]) 
    });
}
scrape(filtersExample)

