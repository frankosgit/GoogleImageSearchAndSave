# PhotoHive

**PhotoHive** is a full-stack application that allows users to search for images, like their favorites, and save these images to their profile for future reference. Built with a React frontend, a Node and Express backend, and MongoDB for data persistence. Data validation is enforced using Joi.

## Features

* User authentication and profile management
* Image search functionality
* Ability to like and save favorite images
* Profile dashboard to view and remove liked images.

## Prerequisites
* Node.js
* npm or yarn
* MongoDB


## Installation
**These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.**

**Clone the repository:**
* git clone https://github.com/frankosgit/PhotoHive.git
  
**Install frontend dependencies:**
```cd googleimagesearchandsave/frontend```
``` npm install```

**Install backend dependencies:**
```cd ../backend```
```npm install```

**Set up environment variables:**
Create a .env file in the backend directory and add the following variables:

* MONGO_USERNAME=your_mongodb_username
* MONGO_PASSWORD=your_mongodb_password
* SERVER_PORT=your_serverport


## Start the backend server:
```cd googleimagesearchandsave/server```
```npm start```
  
## Start the frontend application:
```cd googleimagesearchandsave/frontend```
```npm run dev```

The app should now be running on http://localhost:5173.

## Usage
**User Registration and Login:** 
* Log in via google or github to access the image search functionality.
* Searching for Images: Use the search bar to find images based on keywords, if your query is miss-spelled, you will get a suggestion for spelling correction.
* Liking and Saving Images: Like any image you find appealing; liked images will automatically be saved to your profile.
* Viewing Your Profile: Navigate to your profile to view and manage your liked images.
* Unliking and Removing Images: Unlike any image you want to remove; this will permenantly remove the image from your profile.
  
## Built With
* React - The web framework used
* Node.js - Server Environment
* Express - Web application framework
* MongoDB - Database
* Joi - Data validation

## Authors
Francis Jones
