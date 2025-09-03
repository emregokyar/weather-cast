import axios from "axios";
import dotenv from "dotenv"

const API_URL = "https://api.openweathermap.org/data/3.0/onecall?";
const GEO_API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";

dotenv.config();
const API_KEY = process.env.API_KEY;

//Exporting page so routes can use it
export const homePage = async (req, res) => {
    // I have rendered default page unless user doesn't share current location info, in this case it is Istanbul
    const lat = 41.0351;
    const long = 28.9833;

    try {
        //Retrieving Wather Info
        const result = await axios.get(API_URL 
            + "lat=" + lat 
            + "&lon=" + long 
            + "&exclude=minutely&units=metric&appid=" + API_KEY);
        
        const resolvedData = result.data; 

        const hourlyData = resolvedData.hourly;
        const hourlySendingData = getHourlyInfo(hourlyData, resolvedData.timeZone);
        const dailyData = resolvedData.daily;
        const dailySendingData = getDailyInfo(dailyData, resolvedData.timeZone);
        
        res.render("pages/home", {
            name: "Istanbul",
            icon: getIcon(resolvedData.current.weather[0].id),
            photo: getPhoto(resolvedData.current.weather[0].id),
            humidity: resolvedData.current.humidity,
            wind: resolvedData.current.wind_speed,
            temp: parseInt(resolvedData.current.temp),
            hourly: hourlySendingData,
            daily: dailySendingData
        });
    } catch (error) {
        console.log("Problem with making API request: " + error);
    }
};

// Retrieving current location weather, fetched to front end
export const currentWeather = async (req, res) => {
    const lat = req.query.lat;
    const long = req.query.long;

    try {
        //Retrieving Wather Info
        const result = await axios.get(API_URL 
            + "lat=" + lat 
            + "&lon=" + long 
            + "&exclude=minutely&units=metric&appid=" + API_KEY);
        
        const resolvedData = result.data; 
        const hourlyData = resolvedData.hourly;
        const hourlySendingData = getHourlyInfo(hourlyData, resolvedData.timezone);
        const dailyData = resolvedData.daily;
        const dailySendingData = getDailyInfo(dailyData, resolvedData.timezone);

        const cityResponse = await axios.get(
            `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=${API_KEY}`
        );
        const cityName = cityResponse.data[0].name;
        
        res.render("pages/home", {
            name: cityName,
            icon: getIcon(resolvedData.current.weather[0].id),
            photo: getPhoto(resolvedData.current.weather[0].id),
            humidity: resolvedData.current.humidity,
            wind: resolvedData.current.wind_speed,
            temp: parseInt(resolvedData.current.temp),
            hourly: hourlySendingData,
            daily: dailySendingData
        });
    } catch (error) {
        console.log("Problem with making API request: " + error);
    }
};

// Weather by Search
export const searchWeather = async (req, res) => {
    const city = req.body.city;
    try {
        // Retrieving city info
        const cityResult = await axios.get(GEO_API_URL 
            + city
            + "&appid=" + API_KEY);
        const resolvedCityData = cityResult.data; 
        const lat = resolvedCityData.coord.lat;
        const long = resolvedCityData.coord.lon;

        // Retrieving weather info
        const result = await axios.get(API_URL 
            + "lat=" + lat 
            + "&lon=" + long 
            + "&exclude=minutely&units=metric&appid=" + API_KEY);
        
        // Using data
        const resolvedData = result.data; 

        const hourlyData = resolvedData.hourly;
        const hourlySendingData = getHourlyInfo(hourlyData, resolvedData.timezone);
        const dailyData = resolvedData.daily;
        const dailySendingData = getDailyInfo(dailyData, resolvedData.timezone);
        
        res.render("pages/home", {
            name: resolvedCityData.name,
            icon: getIcon(resolvedData.current.weather[0].id),
            photo: getPhoto(resolvedData.current.weather[0].id),
            humidity: resolvedData.current.humidity,
            wind: resolvedData.current.wind_speed,
            temp: parseInt(resolvedData.current.temp),
            hourly: hourlySendingData,
            daily: dailySendingData
        });
    } catch (error) {
        console.log("Problem with making API request: " + error);
    }
};


// Creating daily info
function getDailyInfo(dailyData, timeZone) {
    const dailySendingData = [];

    for (let i = 0; i < 7; i++) {
        const day = dailyData[i];
        const weatherId = day.weather[0].id;
        const weatherCon = day.weather[0].main;
        const temp = day.temp;
        const dt = day.dt;
        const humid = day.humidity;
        const wind = day.wind_speed;

        dailySendingData.push([getDate(dt, timeZone), getDay(dt, timeZone), parseInt(temp.day), weatherCon, parseInt(temp.night), getIcon(weatherId), parseInt(wind), humid]);
    }
    dailySendingData[0][1] = "Today";

    return dailySendingData;
}

// Creating hourly info
function getHourlyInfo(hourlyData, timeZone) {
    const hourlySendingData = [];
    
    for (let i = 0; i < 6; i++) {
        const hour = hourlyData[i];
        const weatherId = hour.weather[0].id;
        const temp = hour.temp;
        const dt = hour.dt;

        hourlySendingData.push([getTime(dt, timeZone), parseInt(temp), getIcon(weatherId)]);
    }
    hourlySendingData[0][0] = "Now";

    return hourlySendingData;
}

// Retrieving Icon Info
function getIcon(weatherId) {
    let icon;

    if (weatherId >= 200 && weatherId <= 232) {
        icon = "storm.png"; 
    } else if (weatherId >= 300 && weatherId <= 321 && weatherId >= 520 && weatherId <= 531) {
        icon = "rain.png";
    } else if (weatherId >= 500 && weatherId <= 504) {
        icon = "sunrain.png";
    } else if (weatherId === 511 && weatherId >= 600 && weatherId <= 622) {
        icon = "snow.png";
    } else if (weatherId >= 700 && weatherId <= 781) {
        icon = "mist.png";
    } else if (weatherId === 800) {
        icon = "clear.png";
    } else if (weatherId === 801 && weatherId === 802) {
        icon = "fewclouds.png";
    } else {
        icon = "cloud.png";
    }

    return icon;
}

// Retrieving Wheather Photo
function getPhoto(weatherId) {
    let photo;

    if (weatherId >= 200 && weatherId <= 232) {
        photo = "storm.jpg"; 
    } else if (weatherId >= 300 && weatherId <= 321 && weatherId >= 520 && weatherId <= 531) {
        photo = "rain.jpg";
    } else if (weatherId >= 500 && weatherId <= 504) {
        photo = "rain.jpg";
    } else if (weatherId === 511 && weatherId >= 600 && weatherId <= 622) {
        photo = "snow.jpg";
    } else if (weatherId >= 700 && weatherId <= 781) {
        photo = "mist.jpg";
    } else if (weatherId === 800) {
        photo = "clear.jpg";
    } else if (weatherId === 801 && weatherId === 802) {
        photo = "cloud.jpg";
    } else {
        photo = "cloud.jpg";
    }
    
    return photo;
}

function getTime(utcDate, timezoneName) {
    const utcTimestampInMilliseconds = utcDate * 1000;
    const dateObject = new Date(utcTimestampInMilliseconds);

    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: timezoneName
    };
    return dateObject.toLocaleTimeString('en-US', timeOptions);
}

function getDate(utcDate, timezoneName) {

    const utcTimestampInMilliseconds = utcDate * 1000;
    const dateObject = new Date(utcTimestampInMilliseconds);

    const dateOptions = {
        month: 'numeric',
        day: 'numeric',
        timeZone: timezoneName
    };
  return dateObject.toLocaleDateString('en-US', dateOptions);
}

function getDay(utcDate, timezoneName) {
    const utcTimestampInMilliseconds = utcDate * 1000;
    const dateObject = new Date(utcTimestampInMilliseconds);

    const dateOptions = {
        weekday: 'long',
        timeZone: timezoneName
    };

  return dateObject.toLocaleDateString('en-US', dateOptions);
}