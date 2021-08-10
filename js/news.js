const express = require("express");
const https = require("https");

const app = express();
app.get("/", function(req, res){
    const url = "https://newsapi.org/v2/everything?q=Covid&from=2021-08-09&sortBy=popularity&apiKey=ad78940518af41fe97d6be1036fd18ed"
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const newsData = JSON.parse(data)
            const description = newsData.articles[0].description
            const title = newsData.articles[0].title
            res.write("<p> Title is " + title + "<p>")
            res.write("<h1> Description is " + description + ".</h1>")
            res.write("")
            res.send()
        })
    })
})
app.listen(3000, function() {
    console.log("Server is running on port 3000");
})