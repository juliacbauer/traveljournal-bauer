const axios = require('axios');
const router = require("express").Router();


//Generate random quote with API... decided to keep this in addition to the weather API
//because it took me a while to code this and I didn't want to get rid of it
async function inspireQuote() {
  const url = 'https://quotes15.p.rapidapi.com/quotes/random/?rapidapi-key=09e85625bdmshd176106ca717facp14d384jsn52a7c32575d4'
	try {
    const response = await axios.get(url);
    return response.data.content;
  } catch (error) {
    console.error("Error fetching quote:", error);
    throw error; 
  }
};

module.exports = { inspireQuote };