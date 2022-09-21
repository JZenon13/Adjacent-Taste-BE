var express = require("express");
var router = express.Router();

router.route("/").get((req, res) => {
  res.send({ success: true, data: "Hello there" });
});

router.post("/create", function (req, res) {
  const data = req.body;
  const name = `Name:  ${data.name}`;
  const greeting = `Greeting:  ${data.greeting}`;

  res.send({ success: true, date: { name, greeting } });
});

router.put("/:id", function (req, res) {
  res.send(`Update Hello there ${req.params.id}`);
});

module.exports = router;
