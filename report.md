# GreenNest Project Report

## 1. Project Title
**GreenNest**

## 2. Project Overview
GreenNest is a simple full-stack web application for a plant and gardening business. It allows users to browse plants, view gardening services, and book a gardener through a booking form. The application uses an Express.js backend, MongoDB for data storage, and a static frontend built with HTML, CSS, and JavaScript.

## 3. Project Objectives
The main objectives of the project are:
- To present gardening products and services in one place.
- To allow users to submit gardener booking requests online.
- To store products and bookings in a MongoDB database.
- To demonstrate frontend and backend integration using REST APIs.

## 4. Technology Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Other Packages:** CORS, Path

## 5. Project Structure
The project is organized into the following main folders and files:
- `server.js` - Main Express server file
- `config/db.js` - MongoDB connection helper
- `models/Product.js` - Product schema
- `models/Booking.js` - Booking schema
- `routes/productRoutes.js` - Product API routes
- `routes/bookingRoutes.js` - Booking API routes
- `public/index.html` - Frontend UI
- `public/style.css` - Page styling

## 6. Application Workflow
1. The server starts on port `5000`.
2. The app connects to MongoDB database `greennest`.
3. The frontend is served from the `public` folder.
4. The browser loads product and booking data from API endpoints.
5. Users can submit a booking form.
6. Bookings are saved in MongoDB and displayed in the My Bookings section.

## 7. Backend Features
### 7.1 Express Server
The server is created using Express.js and includes:
- CORS middleware for cross-origin requests
- JSON body parsing
- Static file hosting for the frontend
- API routes for products and bookings

### 7.2 Product API
The product route supports:
- `GET /api/products` to fetch all products
- `POST /api/products` to add a new product

### 7.3 Booking API
The booking route supports:
- `GET /api/bookings` to fetch all bookings
- `POST /api/bookings` to create a new booking

## 8. Database Models
### 8.1 Product Model
The Product schema contains:
- `name` - product name
- `price` - product price
- `image` - optional image URL or path
- `description` - optional product description

### 8.2 Booking Model
The Booking schema contains:
- `name` - customer name
- `service` - requested service type
- `date` - booking date
- `address` - customer address

## 9. Frontend Features
The frontend is a single-page interface with tab-based navigation. It includes:
- Home section
- Plants section
- Services section
- Book Gardener form
- My Bookings section

The JavaScript in `index.html` handles:
- Switching between tabs
- Fetching and displaying products
- Fetching and displaying bookings
- Submitting booking requests through the API
- Enabling the booking button only when all form fields are filled

## 10. User Interface Design
The UI uses a simple green theme to match the gardening concept. The layout includes:
- A header with navigation links
- Card-based layout for plants and services
- A booking form centered on the page
- A footer with copyright text

## 11. Key Functionalities
- View available plants
- View gardening services
- Submit a gardener booking request
- Display all submitted bookings
- Store and retrieve data from MongoDB

## 12. Strengths of the Project
- Easy to understand and run locally
- Clear separation of frontend, backend, and database logic
- Simple REST API structure
- Useful for demonstrating CRUD-style application design

## 13. Limitations
- No user authentication or login system
- No edit or delete functionality for products or bookings
- API URLs are hardcoded to `localhost`
- No automated test cases are included
- Database connection logic is duplicated in `server.js` and `config/db.js`

## 14. Future Improvements
Possible enhancements for GreenNest include:
- Adding user authentication
- Creating admin pages for managing products and bookings
- Adding update and delete operations
- Moving API URLs into environment variables
- Improving responsive design for mobile devices
- Adding validation and error handling on both frontend and backend

## 15. Conclusion
GreenNest is a compact gardening service web application that combines a simple frontend with an Express and MongoDB backend. It successfully demonstrates product listing, booking submission, and database integration in a clean and practical project structure.
