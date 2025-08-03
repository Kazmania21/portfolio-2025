# Porfolio
> A web application that displays projects kept in a MongoDB database using React, Node, and Express.

## How to install

1. Releases are kept [here](https://github.com/Kazmania21/portfolio-2025/tags).

2. After installing a release, run npm install to download the dependencies.

## Requirements

node v20.14.0 or higher

## How to run

```bash
npm start
```

## Features

1. Displays projects along including technologies used and associated urls and tags.
2. Uses a search and filter feature to find projects quicky.
3. About and contacts page available to employeers.
4. Signed in users can perform CRUD operations on various projects and can edit the about page.
5. Sign up function only available through api calls and not directly through the website. It is usually not operational in production as there only needs to be one user.

## Project Structure

This project follows a modular and scalable architecture with clear separation of concerns:

```
├── config/ # Application configuration and environment setup  
├── forms/ # Input validation forms for different features  
├── middleware/ # Express middleware (auth, validation, CSRF, etc.)  
├── models/ # Mongoose (or ODM) schema definitions  
├── routes/ # Express route definitions (generic CRUD and auth)  
├── services/ # Business logic and database query executors  
├── utils/ # Generic helper utilities (response formatting, file handling, etc.)  
├── uploads/ # Static user-uploaded files (images, etc.)  
├── server.js # Entry point: app initialization and route mounting  
├── package.json # Project dependencies and scripts  
```

### Key Points

- **`models/`**: Schemas only - no business logic here.
- **`services/`**: Handle data operations and domain logic; called by routes.
- **`routes/`**: Define API endpoints; mostly instantiate services and send responses.
- **`forms/`**: Validate and sanitize user input per feature.
- **`middleware/`**: Centralize Express middleware for auth, validation, etc.
- **`utils/`**: Generic helpers used across the app (e.g., response formatting).
- **`uploads/`**: Store user-uploaded files separately from code.

### Adding New Features

1. Create or update the Mongoose schema in `models/`.
2. Write validation logic in a new or existing file in `forms/`.
3. Add new business/data logic to `services/` (query executors or domain services).
4. Define new routes or extend existing ones in `routes/`.
5. Use middleware as needed by placing it in `middleware/`.
6. Add any generic helpers to `utils/` if reusable outside your feature.
