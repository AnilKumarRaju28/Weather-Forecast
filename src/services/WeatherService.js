import { DateTime } from "luxon";

const API_KEY = 'Your Weathermap API Key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(`${BASE_URL}/${infoType}`);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    console.log('Fetching URL:', url.toString());

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

const iconUrlFromCode = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | Local time:' hh:mm a") => 
    DateTime.fromSeconds(secs + offset, { zone: 'utc' }).toFormat(format);

const formatCurrent = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
        timezone,
    } = data;

    const { main: details, icon } = weather[0];
    const formattedLocalTime = formatToLocalTime(dt, timezone);

    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        country,
        sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
        sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
        speed,
        details,
        icon: iconUrlFromCode(icon),
        formattedLocalTime, 
        dt, 
        timezone,
        lat,
        lon
    };
};

const formatForecastWeather = (secs, offset, data) => {
    const hourly = data.filter(f => f.dt > secs).map(f => ({
        temp: f.main.temp,
        time: formatToLocalTime(f.dt, offset, 'hh:mm a'),
        icon: iconUrlFromCode(f.weather[0].icon),
    })).slice(0, 5);

    const daily = data.filter(f => f.dt_txt.slice(-8) === "00:00:00").map(f => ({
        temp: f.main.temp,
        time: formatToLocalTime(f.dt, offset, "ccc"),
        icon: iconUrlFromCode(f.weather[0].icon),
    }));

    return { hourly, daily };
};

const getFormattedData = async (searchParams) => {
    try {
        const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrent);

        const {dt, lat, lon, timezone} = formattedCurrentWeather;
        // Call formatForecastWeather directly
        const formattedForecastWeather = await getWeatherData('forecast', {lat, lon, units: searchParams.units}).then((d)=> formatForecastWeather(dt, timezone, d.list))

        return { ...formattedCurrentWeather, ...formattedForecastWeather };
    } catch (error) {
        console.error('Error formatting data:', error);
    }
};


export default getFormattedData;
