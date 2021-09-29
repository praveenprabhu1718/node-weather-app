const getWeatherData = (city) => {
  const data = fetch(`http://localhost:3000/weather?city=${city}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((e) => console.log(e));
  return data;
};

const form = document.querySelector("form");
const searchTerm = document.querySelector("input");
const weatherPara = document.querySelector("#weatherPara");
const errorPara = document.querySelector("#errorPara");

form.addEventListener("submit", async (event) => {
  weatherPara.innerHTML = "Loading";
  event.preventDefault();
  const location = searchTerm.value;
  const weatherData = await getWeatherData(location);

  if (weatherData.error) {
    errorPara.innerHTML = weatherData.error;
    weatherPara.innerHTML = "";
  } else {
    weatherPara.innerHTML = weatherData.forecast;
    errorPara.innerHTML = "";
  }
});
