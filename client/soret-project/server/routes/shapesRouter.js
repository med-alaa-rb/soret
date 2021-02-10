var shapesRout = require("express").Router();
const fs = require("fs");
var path = require("./2020/paths").shapes;
var shapes = [];

let fixShp = (x) => x.slice(0, x.indexOf("_"));

shapesRout.get("/data/2020/data/shapes/:id", (req, res) => {
  var info = req.params.id;
  console.log(info);
  shapes = [];
  fs.readFile(path, (error, data) => {
    if (error) {
      throw error;
    }
    let myData = data
      .toString()
      .split("\n")
      .map((el) => [el][0].split(","));
    for (var i = 1; i < myData.length; i++) {
      var obj = {};
      for (var j = 0; j < myData[i].length; j++) {
        obj[myData[0][j]] =
          myData[i][j].match(/^[0-9, .]+$/) != null
            ? JSON.parse(myData[i][j])
            : myData[i][j];
      }
      shapes.push(obj);
    }
    var myObj = {};
    var shp = [];
    for (var i = 0; i < shapes.length - 1; i++) {
      var id = shapes[i].shape_id;
      if (shp.includes(fixShp(id)) === false) {
        shp.push(fixShp(id));
        myObj[fixShp(shapes[i].shape_id)] = Array(0);
      }
    }
    for (var i = 0; i < shp.length; i++) {
      myObj[shp[i]] = shapes.filter(
        (el) => fixShp(el.shape_id) == shp[i] && el.shape_pt_sequence % 2 === 0
      );
    }
    res.send(myObj[fixShp(info)]);
  });
});

module.exports = { shapesRout };
