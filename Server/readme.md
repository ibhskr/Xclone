/backend
├── config/ # Configuration files
│ ├── db.js # Database connection setup
│ └── env.js # Environment variables setup
├── controllers/ # Business logic for each model
│ ├── authController.js # Authentication-related logic
│ ├── tweetController.js # Logic for handling tweet-related routes
│ └── userController.js # Logic for handling user-related routes
├── middlewares/ # Middleware for request handling and authorization
│ ├── authMiddleware.js # JWT verification, authorization
│ └── errorHandler.js # Centralized error handling middleware
├── models/ # Mongoose schemas for MongoDB collections
│ ├── User.js # User model
│ ├── Tweet.js # Tweet model
│ └── Comment.js # Comment model
├── routes/ # Route definitions and endpoint setup
│ ├── authRoutes.js # Routes for login, register, etc.
│ ├── tweetRoutes.js # Routes for tweeting, liking, etc.
│ └── userRoutes.js # Routes for following, updating profile, etc.
├── utils/ # Utility functions and helpers
│ ├── token.js # Functions for generating/validating JWTs
│ └── validations.js # Request validation logic
├── .env # Environment variables
├── app.js # Main app setup and middleware configuration
├── server.js # Entry point to start the server
└── package.json # Project metadata and dependencies
