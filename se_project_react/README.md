# WTWR (What to Wear?)

## About the project

The idea of the application is pretty simple - we make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user.

## Title

Responsive Weather App with Clothing Recommendations (ReactJS)

## Description:

This responsive web application, built with ReactJS, offers a user-friendly interface for displaying the current weather and location, along with a dynamic weather bar and a list of recommended clothing items based on the weather conditions. Users can also add custom clothing elements through a validated form.

## Features:

Real-time Weather Display: Shows the current weather and location data in a clear and informative manner.
Dynamic Weather Bar: The weather bar adapts its appearance based on the current weather (e.g., sunny, cloudy, rainy).
Weather-Based Clothing Recommendations: Generates a list of appropriate clothing suggestions for the user's location, dynamically adjusting based on the weather. Image URLs are used to visually represent each item.
Customizable Clothing List: Users can add new clothing elements using a validated form that requires a name, image URL, and the weather type (Cold, Warm, or Hot) it corresponds to.
Detailed Clothing Information: Clicking on a clothing item reveals an informative pop-up window with the item's image, description, and associated weather type.
Responsive Design: Ensures a seamless user experience mobile devices.

## Figma Design:

The design of this app is available on Figma for visual reference: Figma Design

https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR

## Weather API:

This application integrates with the OpenWeatherMap API (https://api.openweathermap.org) to retrieve real-time weather data. You'll need to create an account and obtain an API key to use the API in your project.

## sage:

Clone the repository: Use git clone https://github.com/<your-username>/<your-repo-name>.git to clone this repository locally.

Install dependencies: Navigate to the cloned directory and run npm install or yarn install to install the required project dependencies.

Set up OpenWeatherMap API: Obtain an API key from https://api.openweathermap.org and create a .env file (if not already present) in your project root directory to store the API key securely. Add the following line to your .env file, replacing <YOUR_API_KEY> with your actual key:
REACT_APP_OPENWEATHERMAP_API_KEY=<YOUR_API_KEY>

Start the development server: Run npm start or yarn start to initiate the development server. Your application should be accessible at http://localhost:3000 (or the port specified in your package.json).
Development:

Codebase structure is organized for maintainability and collaboration.
Hot reloading allows for immediate visual feedback during development.
Feel free to customize the styling, weather API integration, and clothing recommendation logic to fit your preferences.
Technologies:

## Links

Project URL:
ReactJS - JavaScript library for building user interfaces
OpenWeatherMap API (https://api.openweathermap.org) - Weather data provider

## License

## Contributing
