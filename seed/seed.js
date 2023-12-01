if (process.env.MONGODB_URI) {
  console.log(
    "\x1b[31m%s\x1b[0m",
    "SEEDING MONGODB PRODUCTION DATABASE!!!\n".repeat(3)
  );
  console.log("\x1b[31m%s\x1b[0m", "Don't forget to clear MONGODB_URI!\n");
  console.log(
    "\x1b[33m%s\x1b[0m",
    "Run 'export MONGODB_URI=' or close this terminal after seeding.",
    "\n"
  );
} else {
  console.log("\x1b[33m%s\x1b[0m", "SEEDING MONGODB LOCAL DB");
}

const { User, City } = require("../models");
const { connection } = require("../config/connection");

connection.once("open", async function () {
  // insert a sample user
  await User.create({ username: "banana", password: "meatloaf" });
  await insertCities();
  connection.close();

});

//Create city database to seed the app
//Function to seed city info
async function insertCities() {
  try {
    const cities = [
      { name: "New York City", 
        state: "New York", 
        description: "If you like the hustle and bustle of city life, New York City is for you! You can explore the shops at Time Square, see a show on Broadway and admire the Statue of Liberty!", 
        attraction1: "Museum of Modern Art (MoMA)",
        attraction2: "Central Park", 
        attraction3: "Empire State Building", 
        attraction4: "Statue of Liberty",
        attraction5: "The Metropolitan Museum of Art (The Met)", 
        tip: "Don't be afraid to use public transportation. It is affordable, and you will get a true taste of city life!",
      },
      { name: "Honolulu", 
        state: "Hawaii", 
        description: "Honululu is on the Island of Oahu and is home to some of the most beautiful beaches ever, including Waikiki, Lanikai and Punaluu. You can also see amazing colorful fish and coral reefs at Hanauma Bay and Diamond Head Volcano!", 
        attraction1: "Diamond Head State Monument",
        attraction2: "Pearl Harbor and USS Arizona Memorial",
        attraction3: "Manoa Falls",
        attraction4: "Hanauma Bay Nature Preserve",
        attraction5: "Koko Crater Railway Trail",
        tip: "Rent a car so you can drive around the island of Oahu and see some sights outside of Honululu like Makapuu Beach Park." 
      },
      { name: "Los Angeles", 
        state: "California", 
        description: "LA is a hub for stardom: You can see the Hollywood sign and the Hollywood walk of fame. You can also get some sun at one of its beaches", 
        attraction1: "Rodeo Drive",
        attraction2: "Santa Monica Pier and Beach",
        attraction3: "The Hollywood Sign",
        attraction4: "Griffith Observatory and Griffith Park",
        attraction5: "Universal Studios Hollywood",
        tip: "When making the itinerary for your trip, do not forget to account for traffic. LA is known for its traffic and crowds, so plan ahead!" 
      },
      { name: "Seattle", 
        state: "Washington", 
        description: "Here, you can go up the famous Space Needle and see insane city views. If you love coffee, you are in luck because Seattle is the coffee capital of the U.S.! You can also see Mount Rainier from the city.", 
        attraction1: "Space Needle",
        attraction2: "Pike Place Market",
        attraction3: "Museum of Pop Culture (MoPOP)",
        attraction4: "Woodland Park Zoo",
        attraction5: "Smith Tower",
        tip: "Pack a warm jacket and a rain coat because the weather can be unpredictable." 
      },
      { name: "San Francisco", 
        state: "California", 
        description: "The Golden Gate Bridge is one of the main attractions in San Francisco! You can also explore the waterfront shops at Fishermans Wharf.", 
        attraction1: "Golden Gate Bridge",
        attraction2: "Alcatraz Island",
        attraction3: "Fisherman's Wharf",
        attraction4: "Union Square",
        attraction5: "The Painted Ladies",
        tip: "Use the public transportation systems to navigate to tourist destinations!"
      },
      { name: "Las Vegas", 
        state: "Nevada", 
        description: "If you're a night owl who enjoys exciting city life after the sun has set, Las Vegas is for you! It is known for its casinos on the Strip - it is the Entertainment Capital of the World", 
        attraction1: "Bellagio Conservatory and Botanical Gardens",
        attraction2: "High Roller Observation Wheel",
        attraction3: "The Mob Museum",
        attraction4: "Red Rock Canyon National Conservation Area",
        attraction5: "Hoover Dam",
        tip: "There's more to Las Vegas than casinos! You can also visit the Hoover Dam and the Grand Canyon." 
      },
      { name: "Nashville", 
        state: "Tenessee", 
        description: "Nashville is known for the Country Music Hall of Fame and the Johnny Cash Museum. There are also fun honky-tonk bars, and the city offers a variety of delicious food to try.", 
        attraction1: "Country Music Hall of Fame and Museum",
        attraction2: "Grand Ole Opry",
        attraction3: "Broadway Honky Tonks",
        attraction4: "Shelby Bottoms Greenway and Nature Park",
        attraction5: "Cheekwood Estate & Gardens",
        tip: "Nashville has tons of live music venues, so do not miss out on some live entertainment!" 
      },
      { name: "Miami", 
        state: "Florida", 
        description: "Miami is the gateway to the Caribbean: You can go for a swim in the clear waters of the Atlantic ocean and lay on one of its white sand beaches. It also has a vibrant art scene!", 
        attraction1: "South Beach",
        attraction2: "Art Deco Historic District",
        attraction3: "Little Havana",
        attraction4: "Everglades National Park",
        attraction5: "Miami Seaquarium",
        tip: "Don't forget sunscreen! The UV index can get as high as 12 in the summer, so always keep it on hand so you can reapply." 
      },
      { name: "Portland", 
        state: "Oregon", 
        description: "Portland is extremely eco-friendly and sustainability-oriented. It is a bike-friendly city and it is full of nature, so you can be active and enjoy the beauty of the Earth!", 
        attraction1: "Washington Park",
        attraction2: "Portland Art Museum",
        attraction3: "Powell's City of Books",
        attraction4: "Food Cart Pods",
        attraction5: "Forest Park",
        tip: "Don't miss out on the Alberta Arts District! It is known for its art galleries and local shops."
      },
      { name: "New Orleans", 
        state: "Louisiana", 
        description: "This city has a rich history and culinary heritage! You can visit the historic French Quarters and enjoy a taste of Creole and Cajun foods.", 
        attraction1: "French Quarter",
        attraction2: "Café du Monde",
        attraction3: "Jackson Square",
        attraction4: "New Orleans City Park",
        attraction5: "New Orleans Jazz National Historical Park",
        tip: "Don't forget to try a beignet! These fritters, or deep-fried pastries, are sure to satisfy your sweet tooth." 
      }
    ];
    await City.insertMany(cities);
    console.log('Cities inserted successfully');
  } catch (err) {
    console.error('Error inserting cities:', err);
  }
}