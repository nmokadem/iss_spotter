/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = function(callback) {
  // fetch IP address from JSON API
  let query = "https://api.ipify.org?format=json";

  request(query, (error, response, body) => {
    if (error) {
      callback(error,null);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    callback(null,data.ip);
  });
};

const fetchCoordsByIP = function(ipAddress,callback) {
  let query = "https://api.freegeoip.app/json/" + ipAddress + "?apikey=93195ad0-3dbb-11ec-8678-2f9fb07b4367";
  request(query, (error, response, body) => {
    if (error) {
      callback(error,null);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null,body);
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  latitude = coords.latitude;
  longitude = coords.longitude;
  let query = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  request(query, (error, response, body) => {
    if (error) {
      callback(error,null);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    callback(null,data.response);
  });
};

module.exports = { fetchMyIP , fetchCoordsByIP, fetchISSFlyOverTimes };

