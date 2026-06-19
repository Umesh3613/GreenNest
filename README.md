# GreenNest

GreenNest is a simple full-stack gardening application built with Node.js, Express, MongoDB, HTML, CSS, and JavaScript. It lets users browse plants, view gardening services, and book a gardener through a lightweight web interface.

## Features

- Browse available plants from the database
- Explore plants and services through attractive homepage buttons
- View gardening services on the frontend
- Submit a gardener booking request
- See saved bookings in the My Bookings section
- REST API for products and bookings

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Middleware: CORS, JSON parsing, static file hosting

## Project Structure

- `server.js` - Main Express server
- `config/db.js` - MongoDB connection helper
- `models/product.js` - Product schema
- `models/Booking.js` - Booking schema
- `routes/productRoutes.js` - Product API routes
- `routes/bookingRoutes.js` - Booking API routes
- `public/index.html` - Frontend page
- `public/style.css` - Frontend styling
- `public/script.js` - Frontend logic

## API Endpoints

### Products

- `GET /api/products` - Fetch all products
- `POST /api/products` - Add a new product

### Bookings

- `GET /api/bookings` - Fetch all bookings
- `POST /api/bookings` - Create a new booking

## How to Run

1. Install dependencies:

	```bash
	npm install
	```

2. Make sure MongoDB is running locally at `mongodb://127.0.0.1:27017/greennest`.

3. Start the server:

	```bash
	npm start
	```

   For development with automatic restart, use:

	```bash
	npm run start:dev
	```

4. Open the application in your browser:

	```
	http://localhost:5000
	```

## Notes

- The frontend uses hardcoded local API URLs, so it is currently set up for local development.
- The homepage includes two CTA buttons to jump directly to plants and services.
- There is no authentication or admin panel yet.
- `config/db.js` is available as a reusable connection helper, but `server.js` currently connects to MongoDB directly.
- The app is deployment-ready for Render with MongoDB Atlas using environment variables.

## Future Improvements

- Add authentication
- Add update and delete operations
- Move configuration values into environment variables
- Improve mobile responsiveness
- Add validation and error handling