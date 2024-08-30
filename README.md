# User Management System

## Overview

This project is a full-stack application for managing user, built with React, Bootstrap, Node.js, Express, and MongoDB. The system consists of two main components:
Client: A frontend interface built with React and Bootstrap, responsible for user interaction and data visualization.
Server: A backend API built with Node.js, Express, and MongoDB, responsible for data storage.

## Client

Built with: React, Bootstrap, and React-Bootstrap
Notifications: Uses React-Toastify for notifications
Port: Served on port 3000

## Server

Built with: Node.js, Express, and MongoDB
MongoDB interactions: Uses Mongoose for MongoDB interactions
Port: Served on port 3002
MongoDB instance: Connects to MongoDB instance on port 27017

## Dockerization

Containerization: The application is containerized using Docker
Services: Three services are defined: client, server, and mongo
Ports:
Client service exposes port 3000
Server service exposes port 3002
Mongo service exposes port 27017

## Getting Started

Clone the repository
Run docker-compose up to start the services
Access the client interface at http://localhost:3000/
Access the server API at http://localhost:3002/

## Scripts

npm run build: Builds the client application for production
npm run serve: Serves the built client application
npm run server: Starts the server application

## Dependencies

Client: React, Bootstrap, React-Bootstrap, React-Toastify
Server: Express, Mongoose, Express-Validator
Dev Dependencies:
Client: Webpack, Babel, CSS-Loader, Style-Loader, HTML-Webpack-Plugin
Server: None

## License

ISC License

## Author

Naveen GS
