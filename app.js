const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const query = req.body.cityName;
    const appid = "cc602649092a8ba10f4067b80cb3e127";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + unit;
    https.get(url, function(response){    
        response.on("data", function(Data){
            const weatherData = JSON.parse(Data);
            const description = weatherData.weather[0].description;
            const temperature = weatherData.main.temp;
            res.write("<h1>" + query + "'s weather is described as: " + description + "</h1>");
            res.write("<h4>" + query + "'s temperature is: " + temperature + " degrees Celcius</h4>");
            res.send();
        })
    })
})

const port = 3000;
app.listen(port, function(){
    console.log(`Listening on port ${port}`);
})