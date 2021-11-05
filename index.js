// index.js
const { fetchMyIP , fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

const convertTimestampToDate = function(unix_timestamp) {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp * 1000);

  // // Hours part from the timestamp
  // var hours = date.getHours();
  // // Minutes part from the timestamp
  // var minutes = "0" + date.getMinutes();
  // // Seconds part from the timestamp
  // var seconds = "0" + date.getSeconds();

  // // Will display time in 10:30:23 format
  // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  return date.toLocaleString(); // + " " + formattedTime;
}

const secondsToMinutes = function(seconds) {
  
  let min = Math.floor(seconds / 60);
  let sec = seconds - min * 60;
  
  // if (min < 10) min = "0" + min;
  // if (sec < 10) sec = "0" + sec;

  return min + " minute(s) " + sec + " Second(s)";
}

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);

  fetchCoordsByIP(ip, (error, coord) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
    const data = JSON.parse(coord);
    console.log('It worked! Returned Coordinations: latitude(' + data.latitude + ') Longitude (' + data.longitude + ')');

    let coords = {"latitude" : data.latitude,
                  "longitude": data.longitude
                };

    fetchISSFlyOverTimes(coords, (error, timetable) => {
      if (error) {
        console.log("It didn't work!" , error);
        return;s
      }

      console.log('It worked! Returned times on the following dates and times:');
      for (let time of timetable) {
        console.log("Next pass at ",convertTimestampToDate(time.risetime),"     for ",secondsToMinutes(time.duration));
      }
    });
  
  });
});

