# CapStone Travel App

## Overview

- A travel app, which provides the info about weather and location image of place you want to travel for specific dates.
- Travel app allow you to choose dates between 6 months only as of now. 

## Get Username and API KEY's

- Please get a username from [geonames](https://www.geonames.org/) to find latitude and longitude of place 
- Please get an api key from [pixabay](https://pixabay.com/) to find image of place
- Please get an api key from [weatherbit](https://www.weatherbit.io/) to get weather data from latitude and longitude
- Add a file `.env` in project root directory with below keys
  ```
  GEONAMES_USERNAME=<username>
  WEATHER_BIT_API_KEY=<weather-bit-api-key>
  PIXABAY_API_KEY=<pixabay-api-key>
  ```

## Before running

- Install [nodejs](https://nodejs.org/en/) if not present or use [Node Version Manager](https://github.com/nvm-sh/nvm)
- Node version `v17.9.1`
- Run `npm install` to install all dependencies in command line

## Run locally production mode

1. Run `npm run build-prod` to build application
2. Run `npm run start` to start application
3. Open http://localhost:3000 to view webpage

## Run locally development mode

1. Run `npm run start` to start server
2. Run `npm run build-dev` to build and opens webpage in default browser


## Run test

1. Run `npm run build-prod` to build artifacts
2. Run `npm run test` to run tests

## Using app

1. Input the place you would like to travel
2. Input the start date you would like to travel, same for end date.
3. Observe the following,
   1. If start date, before 7 days, you get current weather and image of place with total trip length
   2. If start date, after 7 days, you get forecast weather (max and min) and image of place with total trip length