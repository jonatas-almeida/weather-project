const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


//Starting the server
app.listen(3000, function(){
  console.log("Server running on localhost:3000");
});

//Get Method
//Getting Data from OpenWeather API
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res){

  const query = req.body.cityName;
  const apiKey = "c6471ba981f5b7f467d29d9e9d25601a";
  const units = "metric";
  //Final URL
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appId=${apiKey}&units=${units}`;

  
  //Fetching data
  https.get(baseUrl, function(response){
    response.on('data', function(data){
      const weatherData = JSON.parse(data);//Converts the Hexadecimal data response in a JavaScript Object
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;//weather[0] access the first value of the weather array and returns its description
      const previousPage = '/index.html'

      const icon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

      res.write(`<h1>The temperature in ${query} is ${temp} degrees Celsius.</h1>`);
      res.write(`<p>The weather is currently ${description}</p>`);
      res.write(`<img src=${icon}>`);

      res.send();
    });
  });
});
