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
    //Get the search query
    let query = req.query.city;
    //Get inspiring quote
    const oneQuote = await controllers.quote.inspireQuote();
    //Get city based on search
    let cities = [];
    if (query) {
      cities = await City.find({ name: { $regex: new RegExp(query, 'i') } }).lean();
    } else {
      cities = await City.find().lean();
    }
    res.render("search", { isLoggedIn: req.session.isLoggedIn, oneQuote, query, cities });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.render("error", { message: "Failed to fetch data" });
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
