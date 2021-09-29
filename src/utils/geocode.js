const axios = require("axios");

const GEOCODING_API_KEY =
  "pk.eyJ1IjoicHJhdmVlbnByYWJodTc3NyIsImEiOiJja3UzbWNyaGUzMXBmMnFxbms5anFyamJ2In0.evn3mD1JxQEtt529ho7fSQ";

const geocode = (place, callback) => {
  const GEOCODING_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    place
  )}.json?access_token=${GEOCODING_API_KEY}&limit=1`;
  axios
    .get(GEOCODING_URL)
    .then((response) => {
      if (response.data.features.length === 0) {
        callback("invalid place name");
      } else {
        const {
          data: { features: data },
        } = response;
        const { place_name: placeName } = data[0];
        const {
          center: [longitude, latitude],
        } = data[0];
        const weatherData = {
          placeName,
          latitude,
          longitude,
        };
        callback(undefined, weatherData);
      }
    })
    .catch((e) => callback("unable to fetch the weather"));
};

module.exports = geocode;
