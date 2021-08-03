const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) =>{
    if (req.url == "/"){
        req.url = "index"
    }
    var fullURL = "client/templates/" + req.url + ".html"
    console.log(fullURL)
    res.writeHead(200, {'Content-Type' : "text/html"});
    fs.readFile(fullURL, function(error, data){
    if (error){
        res.writeHead(404)
        res.write("Error: Not Found")
    } else {
        res.write(data)
    }
    res.end();
    })
})

server.listen(port, hostname, () => {
    console.log('Server running at http://', hostname, ':', port, '/');
})
