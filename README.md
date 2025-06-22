
# NASA Explorer Project

A full-stack application providing Nasa data.  
The project contains two main parts:

- **nasa-frontend**: React frontend built with Vite and Material-UI.  
- **nasa-backend**: Node.js backend providing Nasa data API.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Prerequisites](#prerequisites)  
- [Setup & Run Locally](#setup--run-locally)  
  - [Backend Setup](#backend-setup)  
  - [Frontend Setup](#frontend-setup)  
- [Environment Variables](#environment-variables)  
- [Deployment](#deployment)   
- [Project Structure](#project-structure)  

---

## Project Overview

NASA Explorer is a React-based web application displaying Mars InSight weather reports fetched from a custom Node.js backend API. The frontend is built with Vite for fast development and Material-UI for UI components. The backend exposes REST endpoints serving Mars weather data.

---

## Prerequisites

- Node.js (version 16 or above recommended)  
- npm or yarn package manager  
- Git (for cloning repo)

---

## Setup & Run Locally

### Backend Setup

1. Open terminal and navigate to the backend folder:  
   ```bash
   cd nasa-backend
   npm install
   node index.js

   
  ### Frontend Setup
  
1. Open terminal and navigate to the frontend folder:
     ```bash
   cd nasa-frontend
   npm install
   npm run dev
     
## Environment Variables
- Create a .env file in the root folder and add:
   NASA_API_KEY=your_api_key_here

## Deployment
This project is **live** on Vercel!  
🔗 **Live Demo:** https://nasa-explorer-a4qo-8aqhqsvth-shanty-shabus-projects.vercel.app/

### Steps to Deploy on Vercel

1. **Push your code** to a GitHub repository.
2. Go to [https://vercel.com](https://vercel.com) and log in.
3. Click **"New Project"** and select your GitHub repo.
4. In **Environment Variables**, add .env variables.
5. Click **"Deploy"**. Your app will be live in seconds.

## Project Structure
 ### Home Page – Insight Mars 
📅 Sol Details Overview

Displays a series of cards showing weather metrics for each Martian Sol (solar day).

Each card includes:

* Sol number

* Average Temperature (°C)

* Wind Speed (m/s)

* Atmospheric Pressure (Pa)

🔍 Wind Speed Filter

Filter cards based on a minimum wind speed threshold.

Helps users focus on high-wind days for comparison.

### APOD - NASA Astronomy Picture of the Day

NASA APOD Integration

Displays the daily featured space image from NASA’s Astronomy Picture of the Day API.

Includes:

* High-resolution image

* Title and detailed description

* Responsive layout using Material UI.

### Insight Mars Weather Dashboard

 Real-Time Mars Weather Data

Fetches data from the NASA InSight API to display weather information from Mars’ surface.

Multi-Graph Visualization

📈 Line Chart – Shows temperature, wind speed, and pressure across multiple Sols (Martian days).

🥧 Pie Chart – Displays the distribution of wind directions.

📊 Bar Chart – Compares average values of weather metrics.

📡 Radar Chart – Visualizes data for a latest Sol across multiple metrics.

###  Chatbot Assistant (Home Page)

Fixed-position Chatbot Icon on the bottom-right.

On click, opens a popup chat interface.

Provides basic interaction:

* Responds with weather information of the latest Sol.

* Displays temperature, wind speed, and pressure.

* Purpose is to offer a quick summary without needing to scroll through the dashboard.





