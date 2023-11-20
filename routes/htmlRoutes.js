const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");
require("../models");

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

router.get("/search", checkAuth, ({ session: { isLoggedIn } }, res) => {
  res.render("search", { isLoggedIn });
});

router.get("/explored", checkAuth, ({ session: { isLoggedIn } }, res) => {
  res.render("explored", { isLoggedIn });
});

router.get("/unexplored", checkAuth, ({ session: { isLoggedIn } }, res) => {
  res.render("unexplored", { isLoggedIn });
});

module.exports = router;
