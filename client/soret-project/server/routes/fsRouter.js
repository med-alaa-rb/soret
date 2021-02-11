var fsRouter = require("express").Router();
const fs = require("fs");
const date = require("date-and-time");
let stopPath = require("./2020/paths").stopPaths;
let stopTimes = require("./2020/paths").stopTimes;
let detailTrip = require("./2020/paths").detailTrip;
let stops_time = [];
let stops = [];
let searchStops = [];
let trips = [];

// function to calculate distance between coords found in stack overflow

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(currentPosition, destiantion) {
  // var R = 6.371; // km
  var R = 6371000;
  var dLat = toRad(destiantion.stop_lat - currentPosition.lat);
  var dLon = toRad(destiantion.stop_lon - currentPosition.lng);
  var lat1 = toRad(currentPosition.lat);
  var lat2 = toRad(destiantion.stop_lat);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return Math.floor(d);
}

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}

var readDistance = (num) => {
  var str = Math.ceil(num) + "";
  if (str.length < 4) {
    return str + " m";
  } else {
    var x = str.substring(0, str.length - 3);
    return x + " km";
  }
};

var sortStopsArr = (arr) => {
  var result = [];
  var reccurse = (arr) => {
    if (!arr.length) {
      return result;
    } else {
      var x = arr.reduce((a, b) => (a.diff < b.diff ? a : b));
      result.push(x);
      arr.splice(arr.indexOf(x), 1);
    }
    return reccurse(arr);
  };
  return reccurse(arr);
};

var clearArr = (arr, i) => {
  if (i < arr.length) {
    return arr;
  } else {
    if (arr.indexOf(arr[i]) != arr.lastIndexOf(arr[i])) {
      arr.splice(arr.indexOf(arr[i]), 1);
      i--;
    } else {
      return clearArr(arr, i++);
    }
  }
};

fsRouter.get("/data/api/2020/stops/:id", (req, res) => {
  const id = req.params.id;
  stops = [];
  fs.readFile(stopPath, (error, data) => {
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
      stops.push(obj);
    }
    id === "allData"
      ? res.send(stops)
      : res.send(stops.filter((res) => res.stop_name.search(id) != -1));
  });
});

fsRouter.post("/data/api/sendUserDestination", (req, res) => {
  stops_time = [];
  trips = [];
  var newArr = [];
  var info = req.body.uD;
  var userPosition = req.body.uP;
  fs.readFile(stopTimes, async (error, data) => {
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
          myData[i][j].match(/^[0-9,.,\b.] +$/) != null
            ? JSON.parse(myData[i][j])
            : myData[i][j];
      }
      stops_time.push(obj);
    }
    var filtred = await stops_time.filter((el) => el.stop_id == info);
    await filtred.map((el) => newArr.push(el.trip_id));
    getStopsArr = await stops_time
      .filter((el) => newArr.includes(el.trip_id))
      .map((el) => searchStops.push(el.stop_id));

    fs.readFile(stopPath, async (error, data) => {
      if (error) {
        throw error;
      }
      let myData = await data
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
        stops.push(obj);
      }
      var possibleStops = await stops.filter((el) =>
        getStopsArr.includes(el.stop_id)
      );
      possibleStops.map((el) => (el["diff"] = calcCrow(userPosition, el)));
      var sortedStops = sortStopsArr(possibleStops);
      var lastRes = (arr) => {
        for (var i = 0; i < arr.length; i++) {
          arr[i].id = i;
          arr[i].diff = readDistance(arr[i].diff);
        }
        return arr;
      };
      var arr = lastRes(sortedStops)
        .filter((el) => el.id % 2 === 0)
        .splice(0, 10);
      res.send(arr);
    });
  });
});

fsRouter.get("/data/api/2020/stopsTimes/:id", async (req, res) => {
  trips = [];
  var info = req.params.id;
  fs.readFile(stopTimes, (error, data) => {
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
          myData[i][j].match(/^[0-9,.,\b.] +$/) != null
            ? JSON.parse(myData[i][j])
            : myData[i][j];
      }
      stops_time.push(obj);
    }
    var filtred = stops_time.filter((el) => el.stop_id == info);
    let getNextTimeFromArr = (str) =>
      typeof str == "string"
        ? parseFloat(str.slice(0, 5).replace(":", ""))
        : str;
    const now = () => {
      var x = new Date().toLocaleTimeString();
      var res = null;
      x.search("pm") == -1
        ? (res = getNextTimeFromArr(x) + 1200)
        : (res = getNextTimeFromArr(x));
      return res;
    };

    let newFiltred = filtred.filter(
      (el) => 1300 < getNextTimeFromArr(el.arrival_time)
    );
    var trip = [];
    newFiltred.map((el) => trip.push(parseFloat(el.trip_id)));
    fs.readFile(detailTrip, (error, data) => {
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
        trips.push(obj);
      }
      var tripRes = [];
      trips.map((el) => (trip.includes(el.trip_id) ? tripRes.push(el) : el));
      combinateObj(newFiltred, tripRes);
      res.send(newFiltred);
    });
  });
});

var combinateObj = (arr1, arr2) => {
  for (var i = 0; i < arr1.length; i++) {
    for (var j = 0; j < arr2.length; j++) {
      if (arr1[i].trip_id == arr2[j].trip_id) {
        arr1[i]["trip_headsign"] = arr2[j]["trip_headsign"];
        arr1[i]["direction_id"] = arr2[j]["direction_id"];
        arr1[i]["shape_id"] = arr2[j]["shape_id"];
      }
    }
  }
  return arr1;
};

module.exports = { fsRouter };

// using this function with search from marker

// });
