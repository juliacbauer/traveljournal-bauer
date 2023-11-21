const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");


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

router.get("/about", checkAuth, ({ session: { isLoggedIn } }, res) => {
  res.render("about", { isLoggedIn });
});

router.get("/search", checkAuth, async (req, res) => {
  try {
    const oneQuote = await controllers.quote.inspireQuote();
    res.render("search", { isLoggedIn: req.session.isLoggedIn, oneQuote });
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.render("error", { message: 'Failed to fetch a quote' });
  }
});

router.get("/explored", checkAuth, ({ session: { isLoggedIn } }, res) => {
  res.render("explored", { isLoggedIn });
});

router.get("/unexplored", checkAuth, ({ session: { isLoggedIn } }, res) => {
  res.render("unexplored", { isLoggedIn });
});

module.exports = router;
