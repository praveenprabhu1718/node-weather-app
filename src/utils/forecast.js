const axios = require("axios");

const WEATHER_API_KEY = "b3150619e6a790b71f39d2b020ae48e4";

const forecast = (latitude, longitude, callback) => {
  const WEATHER_URL = `http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${latitude},${longitude}&units=f`;

  axios
    .get(WEATHER_URL)
    .then((response) => {
      const {
        data: {
          current: {
            temperature,
            feelslike: feelsLike,
            weather_descriptions: [weatherDescription],
          },
          location: { country, region },
        },
      } = response;
      const weatherData = {
        forecast: `Currently ${temperature} degrees out there, but it feels like ${feelsLike} degrees. It's slightly ${weatherDescription}`,
        state: region,
        country,
      };
      callback(undefined, weatherData);
    })
    .catch((e) => callback("forecast: unable to fetch weather"));
};

module.exports = forecast;
