var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const user = mongoose.model('user', { name: String });
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/list", async (req, res) => {
  res.send({ code: 200, })
})
module.exports = router;
