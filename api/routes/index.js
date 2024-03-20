var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Fanpu = mongoose.model('fanpu', { title: String, level: Number, did: { type: mongoose.Types.ObjectId, ref: "fid" } }, 'panpu');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add', (req, res, next) => {
  Fanpu.create(req.body)
  res.send({ code: 200 })

});
router.get('/data', async (req, res, next) => {

  const fanpu = await Fanpu.find().lean()
  let obj = {}
  fanpu.forEach(item => {
    obj[item._id] = item
  });
  let data = []
  fanpu.forEach(item => {
    if (!item["did"]) {
      item["key"] = item._id
      item["value"] = item._id

      data.push(item)
    } else {
      if (!obj[item["did"]]["children"]) {
        obj[item["did"]]["children"] = []
      }
      item["key"] = item._id
      item["value"] = item._id

      obj[item["did"]]["children"].push(item)
    }
  });

  res.send({ code: 200, data })

});

router.get("/dept", async (req, res) => {
  let { id } = req.query
  let data = []
  if (id) {
    data = await Fanpu.find({ _id: id })
  } else {
    data = await Fanpu.find().lean()
  }

  data.forEach(item => {
    item["key"] = item._id
  });
  res.send({ code: 200, data })
})

router.put('/edit', async (req, res, next) => {
  await Fanpu.updateOne({ _id: req.body.id }, req.body)
  res.send({ code: 200 })

});
router.post('/del', async (req, res, next) => {

  await Fanpu.deleteOne({ _id: req.body.id })
  res.send({ code: 200 })

});
module.exports = router;
