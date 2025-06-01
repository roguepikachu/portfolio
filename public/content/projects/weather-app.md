
---
id: 4
title: Weather App
description: A simple weather application that shows current conditions and forecasts.
tags: [JavaScript, React, API]
githubUrl: https://github.com/
demoUrl: https://example.com
featured: false
---

# Weather App

A simple weather application that shows current conditions and forecasts.

## Features

- Current weather conditions
- 5-day forecast
- Location search
- Responsive design
- Weather maps

## API Integration

Uses OpenWeatherMap API for weather data:

```javascript
const API_KEY = 'your-api-key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function getWeather(city) {
  const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}`);
  return response.json();
}
```

Simple and clean interface for checking weather conditions.
