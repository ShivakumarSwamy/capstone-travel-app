const fetch = require("node-fetch");
const moment = require("moment");

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

app.use(express.static("dist"));

const geonamesBaseURL = "http://api.geonames.org";
const weatherBaseURL = "https://api.weatherbit.io/v2.0";
const pixabayBaseURL = "https://pixabay.com/api";

app.get("/", function (req, res) {
    res.sendFile("dist/index.html");
});

app.post("/v1/planTravel", async function(request, response) {
  if (request.body.placeName.length == 0) {
    response.send({ "error": "Please input valid place name." });
    return;
  }

  let data = {};
  const placeData = await searchPlace(request.body.placeName);
  if(placeData.geonames === undefined) {
    console.log("Please check secrets are added in .env and is valid and your username is enabled to use webservice in geonames. Error is", placeData);
    response.send({ "error": "Please try again after some time." });
    return;
  }

  if (placeData.geonames.length == 0) {
    response.send({ "error": "Please input valid place name." });
    return;
  }

  const startDate = request.body.startDate;
  const endDate = request.body.endDate;

  if (moment(startDate).isAfter(moment(endDate))) {
    response.send({ "error": "Please input valid start date before end date." });
    return;
  }

  if (moment(startDate).isAfter(moment().add(6, "days"))) {
    const placeWeatherData = await getForecastPlaceWeather(placeData.geonames[0].lat, placeData.geonames[0].lng);
    data["min_temp"] = placeWeatherData.data[0].min_temp;
    data["max_temp"] = placeWeatherData.data[0].max_temp;
    data["forecast"] = true;
  } else {
    const placeWeatherData = await getCurrentPlaceWeather(placeData.geonames[0].lat, placeData.geonames[0].lng);
    data["temp"] = placeWeatherData.data[0].temp;
    data["forecast"] = false;
  }

  const placeImageData = await getPlaceImage(request.body.placeName);

  data["place"] = request.body.placeName;
  data["startDate"] = startDate;
  data["endDate"] = endDate;
  data["tripLength"] = moment(endDate).diff(moment(startDate), "days") + 1;

  if(placeImageData.hits[0]?.webformatURL) {
    data["imageURL"] = placeImageData.hits[0].webformatURL;
  }
  response.send(data);
});

async function searchPlace(placeName) {
 const response = await fetch(`${geonamesBaseURL}/searchJSON?q=${placeName}&maxRows=1&username=${process.env.GEONAMES_USERNAME}`);
 return await response.json();
}

async function getCurrentPlaceWeather(lat, lon) {
  const response = await fetch(`${weatherBaseURL}/current/?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_BIT_API_KEY}`);
  return await response.json();
}

async function getForecastPlaceWeather(lat, lon) {
  const response = await fetch(`${weatherBaseURL}/forecast/daily/?lat=${lat}&lon=${lon}&days=1&key=${process.env.WEATHER_BIT_API_KEY}`);
  return await response.json();
}

async function getPlaceImage(placeName) {
  const response = await fetch(`${pixabayBaseURL}/?q=${placeName}&image_type=photo&per_page=3&category=buildings&key=${process.env.PIXABAY_API_KEY}`);
  return await response.json();
}

const server = app.listen(3000, () => console.log("App is listening at port 3000"));


module.exports = { app , server };