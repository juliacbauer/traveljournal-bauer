const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");
const City = require('../models/City');
const { User } = require('../models')


router.get("/", ({ session: { isLoggedIn } }, res) => {
  res.render("index", { isLoggedIn });
});

router.get("/login", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("login", { error: req.query.error });
});

router.get("/signup", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("signup", { error: req.query.error });
});

router.get("/private", checkAuth, ({ session: { isLoggedIn } }, res) => {
  res.render("protected", { isLoggedIn });
});

//Make about page
router.get("/about", checkAuth, ({ session: { isLoggedIn } }, res) => {
  res.render("about", { isLoggedIn });
});

//Make search page
router.get("/search", checkAuth, async (req, res) => {
  try {
    //Search parameter
    const query = req.query.city;
    let cities = [];
    //Get city info
    if (query) {
      cities = await City.find({ name: { $regex: new RegExp(query, 'i') } }).lean();
      //Get weather info
      const weatherData = await controllers.weather.getWeather(query);
      //Render page
      res.render("search", { isLoggedIn: req.session.isLoggedIn, query, cities, weather: weatherData });
    } else {
      res.render("search", { isLoggedIn: req.session.isLoggedIn });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.render("search", err.message);
  }
});

//Make favorites page
router.get("/favorites", checkAuth, ({ session: { isLoggedIn } }, res) => {
  res.render("favorites", { isLoggedIn });
});

//Create route to post city to favorites, 
//still couldn't figure this out
//Says user ID undefined, but
//when I have /favorites/:id it says
//internal server error
router.post("/favorites", async (req, res) => {
  try {
    //From handlebars js
    const { cityInfo } = req.body;
    //Finding user... think this is the issue
    const user = await User.findOne({ _id: req.params.id });
    console.log(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found'" });
    }
    //Push the city info data to the favorites in user
    user.favorites.push(cityInfo);
    //Update and save it to the user
    await user.save();
    res.status(200).json({ message: "City added to favorites successfully" });
  } catch (err) {
    console.error("Error adding city to favorites" + err.message);
    res.status(500).json( err.message );
  }
});

//Delete route, couldn't get to this
//because add to favorites didn't work
router.delete("/favorites", async (req, res) => {

})

module.exports = router;
