var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var fsRouter = require("./routes/fsRouter").fsRouter;
var paths = require("./routes/2020/paths").path;
var shapesRout = require("./routes/shapesRouter").shapesRout;

app.use(cors());

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", fsRouter);
app.use("/", paths);
app.use("/", shapesRout);

app.post("/api/2020/data/checkStorage", async (req, res) => {
  res.send(await req.body.includes("soret-quickAcc"));
});

app.post("/api/2020/data/deleteFav", async (req, res) => {
  var result = req.body.arr.filter((el) => el.value != req.body.val);
  res.send(result);
});

app.post("/api/2020/data/checkStorageMapStyle", async (req, res) => {
  res.send(await req.body.includes("soret-cardChoice"));
});

app.post("/api/2020/data/alert/checknotificationTime", async (req, res) => {
  res.send(await req.body.includes("soret-notificationTime"));
});

app.post("/api/2020/data/alert/makeNotificationTime", async (req, res) => {
  let stopTime = changeTime(req.body[0]);
  let time = getTime();
  let result = stopTime - changeTime(time);
  res.send([result]);
});

// time string to miillisecondes
var changeTime = (x) => {
  var y = x.split(":").map((el) => parseInt(el));
  var arr = [3600, 60];
  var result = 0;
  for (var i = 0; i < arr.length; i++) {
    result += arr[i] * y[i];
  }
  return (result + y[2]) * 1000;
};

//get date now in string format "**:**:**"
var getTime = () => {
  let timeNow = new Date().toLocaleTimeString();
  if (timeNow.search("PM") == 0) {
    return timeNow.substring(0, 8);
  } else {
    var arr = timeNow
      .substring(0, 8)
      .split(":")
      .map((el) => parseInt(el));
    arr[0] = arr[0] + 12;
    return arr.join(":");
  }
};

var port = process.env.PORT || 2700;

app.listen(port, () =>
  console.log(`app is listnening to http://192.168.43.52:${port}/`)
);
