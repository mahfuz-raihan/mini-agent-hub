// loading environment variables from .env file
require('dotenv').config({path: '.env'}); 
const API_KEY = process.env.WEATHER_API_KEY;

async function getWeatherTool(location) {
    console.log(`[Tool Executing] Fetching real weather for ${location}...`);

    try {
        // call the openweathermap api
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${data.message}`);
        }
        // format the response for the AI agent
        return {
            temperature: `${data.main.temp}°C`,
            condition: data.weather[0].main,
            description: data.weather[0].description,
            location: data.name 
        };
    } catch (error) {
        console.error("[Tool Error]", error.message);
        return { error: `Could not fetch weather data: ${location}. Reason: ${error.message}` };
    }
}

// for local testing, i run this file standalon to verify the tools works as expected 
// getWeatherTool("Dhaka").then(console.log).catch(console.error);


module.exports = { getWeatherTool };