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
  res.send(req.body.keys.includes("soret-quickAcc"));
});

var port = process.env.PORT || 2700;

app.listen(port, () =>
  console.log(`app is listnening to http://192.168.43.52:${port}/`)
);
