const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");
const City = require('../models/City');


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

//Make explored page
router.get("/explored", checkAuth, ({ session: { isLoggedIn } }, res) => {
  res.render("explored", { isLoggedIn });
});

//Make unexplored page
router.get("/unexplored", checkAuth, ({ session: { isLoggedIn } }, res) => {
  res.render("unexplored", { isLoggedIn });
});

module.exports = router;
