const axios = require('axios');
const router = require("express").Router();

//Get data from external API
const options = {
  method: 'GET',
  url: 'https://quotes15.p.rapidapi.com/quotes/random/?rapidapi-key=09e85625bdmshd176106ca717facp14d384jsn52a7c32575d4',
  headers: {
    'X-RapidAPI-Key': '09e85625bdmshd176106ca717facp14d384jsn52a7c32575d4',
    'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
  }
};

//Function to generate random quote
const inspireQuote = async function () {
	try {
        const response = await axios.request(options);
        return response.data.content;
      } catch (error) {
        console.error("Error fetching quote:", error);
        throw error; 
      }
    };

module.exports = { options, inspireQuote };