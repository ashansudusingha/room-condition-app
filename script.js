//------------------------------------begin
// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  set,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Firebase configuration object (replace with your actual Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyBvl_7QAJjE3nsT3GTfaNsA61pfSUHjDaw",
  authDomain: "project1-dcb27.firebaseapp.com",
  databaseURL:
    "https://project1-dcb27-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project1-dcb27",
  storageBucket: "project1-dcb27.appspot.com",
  messagingSenderId: "911453766605",
  appId: "1:911453766605:web:b78ec1a1e8b725803eba84",
  measurementId: "G-99GYVE2N7N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

//Reference to the 'sensorData' node in the database
const sensorDataRef = ref(database, "sensorData");

onValue(sensorDataRef, (snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val();

    //const lightLabel = document.querySelector(".lightmeter .temperature-label");
    updateLightIntensity(data.lux);
    updateHumidity(data.humidity)
    updateThermometer(data.temperature)
    //lightLabel.textContent=lux;

    currentLightIntensity = lux;


  } else {
    console.log("No data found in 'sensorData'.");
  }
});
//------------------------------------end


// Function to update the thermometer's mercury height and color
function updateThermometer(temp) {
  let currentTemperature=temp;
  const mercury = document.querySelector(".thermometer .mercury");
  const temperatureLabel = document.querySelector(
    ".thermometer .temperature-label"
  );

  // Calculate mercury height (300px thermometer height)
  const height = Math.min(Math.max((currentTemperature / 100) * 100, 0), 100); // Restrict between 0 and 100
  mercury.style.height = `${height}%`;

  // Update color gradient based on temperature
  if (currentTemperature <= 10) {
    mercury.style.background = "blue";
  } else if (currentTemperature <= 20) {
    mercury.style.background = "green";
  } else if (currentTemperature <= 30) {
    mercury.style.background = "yellow";
  } else if (currentTemperature <= 40) {
    mercury.style.background = "orange";
  } else {
    mercury.style.background = "red";
  }
  console.log(currentTemperature);
  // Update the temperature label
  temperatureLabel.textContent = `${currentTemperature}°C`;
}

// Function to update the humidity meter's mercury height and color
function updateHumidity(humidity) {
  let currentHumidity=humidity;
  const mercury = document.querySelector(".humiditymeter .mercury");
  const humidityLabel = document.querySelector(
    ".humiditymeter .temperature-label"
  );

  // Calculate mercury height (300px thermometer height)
  const height = Math.min(Math.max((currentHumidity / 100) * 100, 0), 100); // Restrict between 0 and 100
  mercury.style.height = `${height}%`;

  // Update color gradient based on humidity
  if (currentHumidity <= 10) {
    mercury.style.background = "blue";
  } else if (currentHumidity <= 20) {
    mercury.style.background = "green";
  } else if (currentHumidity <= 30) {
    mercury.style.background = "yellow";
  } else if (currentHumidity <= 40) {
    mercury.style.background = "orange";
  } else {
    mercury.style.background = "red";
  }
  console.log(currentHumidity);
  // Update the humidity label
  humidityLabel.textContent = `${currentHumidity}%`;
}

// Function to update the light meter's mercury height and color
function updateLightIntensity(lux) {
  const mercury = document.querySelector(".lightmeter .mercury");
  const lightLabel = document.querySelector(".lightmeter .temperature-label");

  // Calculate mercury height (300px thermometer height)
  const height = Math.min(
    Math.max((lux / 100) * 100, 0),
    100
  ); // Restrict between 0 and 100
  mercury.style.height = `${height}%`;

  // Update color gradient based on light intensity
  if (lux <= 10) {
    mercury.style.background = "blue";
  } else if (lux <= 100) {
    mercury.style.background = "green";
  } else if (lux <= 150) {
    mercury.style.background = "yellow";
  } else if (lux <= 200) {
    mercury.style.background = "orange";
  } else {
    mercury.style.background = "red";
  }
  console.log(lux);
  // Update the light intensity label
  lightLabel.textContent = `${lux} lx`;
}

// Initialize meters on page load
document.addEventListener("DOMContentLoaded", () => {
  updateThermometer();
  updateHumidity();
  updateLightIntensity();
});

// Firebase real-time updates
const tempRef = database.ref("temperature");
const humidityRef = database.ref("humidity");
const lightRef = database.ref("lightIntensity");

tempRef.on("value", (snapshot) => {
  currentTemperature = snapshot.val();
  updateThermometer();
});

humidityRef.on("value", (snapshot) => {
  currentHumidity = snapshot.val();
  updateHumidity();
});

lightRef.on("value", (snapshot) => {
  currentLightIntensity = snapshot.val();
  updateLightIntensity();
});
