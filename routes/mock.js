const {
  Router
} = require("express");
const DB_DATA = require("./mock.db");
const router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const { query: { url } } = req;
  res.json(DB_DATA[url] || {});
});

module.exports = router;