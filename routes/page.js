var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {

  res.render("shell", {
    title: "Shell"
  });
});
router.get("/page", function (req, res, next) {
  res.render("page", {
    title: "Page"
  });
});

router.get("/mock", function (req, res, next) {
  res.json({
    "mock": "mock"
  });
});

module.exports = router;