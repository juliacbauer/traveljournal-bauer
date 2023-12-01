const axios = require('axios');
const router = require("express").Router();


//Get weather data from external API
async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${process.env.API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    //Fixes the error rendering the page is search value 
    //does not match the City.find
    return null;
  }
}

module.exports = { getWeather };