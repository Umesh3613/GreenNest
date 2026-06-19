# GreenNest Project Report

## 1. Project Title
GreenNest

## 2. Project Overview
GreenNest is a full-stack web application designed for a plant and gardening business. It allows users to explore plants, view gardening services, and submit gardener booking requests through a simple tab-based interface. The application uses an Express.js backend, MongoDB for persistence, and a static frontend built with HTML, CSS, and JavaScript.

## 3. Project Objectives
The project was created to:
- Present gardening products and services in one place.
- Allow users to submit booking requests online.
- Store product and booking data in MongoDB.
- Demonstrate frontend and backend integration using REST APIs.

## 4. Technology Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Supporting packages: CORS, Path

## 5. Project Structure
The project is organized into these main files and folders:
- `server.js` - Main Express server file
- `config/db.js` - MongoDB connection helper
- `models/product.js` - Product schema
- `models/Booking.js` - Booking schema
- `routes/productRoutes.js` - Product API routes
- `routes/bookingRoutes.js` - Booking API routes
- `public/index.html` - Frontend UI
- `public/style.css` - Page styling

## 6. Application Workflow
1. The server starts on port `5000`.
2. The backend connects to the local MongoDB database `greennest`.
3. The frontend is served from the `public` folder.
4. The browser loads products and bookings from the API.
5. Users submit booking requests from the booking form.
6. Saved bookings are displayed in the My Bookings section.

## 7. Backend Features
### 7.1 Express Server
The server includes:
- CORS middleware for cross-origin access
- JSON body parsing
- Static file hosting for the frontend
- API routes for products and bookings

### 7.2 Product API
The product API supports:
- `GET /api/products` to fetch all products
- `POST /api/products` to add a new product

### 7.3 Booking API
The booking API supports:
- `GET /api/bookings` to fetch all bookings
- `POST /api/bookings` to create a new booking

## 8. Database Models
### 8.1 Product Model
The product schema includes:
- `name` - product name
- `price` - product price
- `image` - optional image URL or path
- `description` - optional product description

### 8.2 Booking Model
The booking schema includes:
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
- Enabling the booking button only when all fields are filled

## 10. User Interface Design
The UI uses a simple green theme that matches the gardening concept. Its layout includes:
- A header with navigation links
- Card-based layouts for plants and services
- A centered booking form
- A footer with copyright text

## 11. Key Functionalities
- View available plants
- View gardening services
- Submit a gardener booking request
- Display submitted bookings
- Store and retrieve data from MongoDB

## 12. Strengths of the Project
- Easy to understand and run locally
- Clear separation of frontend, backend, and database logic
- Simple REST API structure
- Good example of CRUD-style application design

## 13. Limitations
- No user authentication or login system
- No edit or delete functionality for products or bookings
- API URLs are hardcoded to `localhost`
- No automated test cases are included
- Database connection logic exists in both `server.js` and `config/db.js`

## 14. Future Improvements
Possible enhancements for GreenNest include:
- Adding user authentication
- Creating admin pages for managing products and bookings
- Adding update and delete operations
- Moving configuration values into environment variables
- Improving mobile responsiveness
- Adding stronger validation and error handling

## 15. Conclusion
GreenNest is a compact gardening service application that combines a simple frontend with an Express and MongoDB backend. It demonstrates product listing, booking submission, and database integration in a clean and practical project structure.
