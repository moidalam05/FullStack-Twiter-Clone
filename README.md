# Twitter Clone Project

Live link [Twitter Clone](https://fullstack-twiter-clone.onrender.com)

## Overview
The Twitter Clone project is a full-stack application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to create accounts, log in, post tweets, interact with other users' tweets (like, comment), delete their own posts, and edit their profiles. The project incorporates authentication and authorization using JSON Web Tokens (JWT), with features like user authentication, protected routes, and more.

## Technologies Used
- MongoDB
- Express.js
- React.js
- Node.js
- React Router DOM
- JSON Web Tokens (JWT)
- CookieParser
- CORS
- @tanstack/react-query (for data fetching and caching)

## Features
- User authentication: Sign up, log in, log out
- Protected routes: Only authenticated users can access certain routes
- User profile management: Edit profile information, update profile picture
- Post tweets: Users can post tweets, delete their own tweets
- Interact with tweets: Like tweets, comment on tweets
- Responsive design: Optimized for various screen sizes

## Setup Instructions
1. Clone the repository: `git clone https://github.com/moidalam05/FullStack-Twiter-Clone`
2. Navigate to the project directory: `cd twitter-clone`
3. Install dependencies:
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`
4. Set up environment variables:
   - Create a `.env` file in the `backend` directory
   - Define environment variables like `MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, etc.
5. Start the backend server: `cd backend && npm start`
6. Start the frontend development server: `cd frontend && npm start`
7. Access the application in your browser at `http://localhost:3000`

## Folder Structure
- `backend`: Contains the Express.js server code
- `frontend`: Contains the React.js frontend code
- `routes`: Backend route handlers for authentication, user, post, and notification routes
- `db`: MongoDB connection and schema setup
- `components`: React components for UI elements, pages, etc.

## Contributions

We welcome contributions from developers of all skill levels. If you're interested in contributing to this project, please follow these steps:

1. Fork the repository and clone it to your local machine.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`.
3. Make your changes and test thoroughly.
4. Commit your changes: `git commit -am 'Add new feature'`.
5. Push to your branch: `git push origin feature/your-feature-name`.
6. Create a pull request, and describe your changes in detail.

Thank you for contributing to our project! Your help is greatly appreciated.

## License
This project is licensed under the Moid Alam.
