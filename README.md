# Reservation System

## Development

### Backend

Ensure MongoDB is installed and running at `mongodb://localhost:27017/`.

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Tech Stack

### Backend

- MongoDB
- Nest.js
- TypeScript

Nest.js framework built on TypeScript, offers a modular and scalable architecture, ideal for complex applications. With support for both RESTful API and GraphQL endpoints, it enables clean code and clear architecture through its modular structure and dependency injection.

MongoDB is chosen as the database for its flexibility, scalability, and support for document-oriented data models, seamlessly integrating with Nest.js.

### Frontend

- React
- Vite

## Project Structure

- RESTful API for guest interactions
- GraphQL for employee interactions

Guest interactions with the backend utilize RESTful API, while restaurant operations leverage GraphQL API.

This design provides flexibility in interface selection, catering to different user needs:

- RESTful API simplifies guest interactions with standard HTTP methods.
- GraphQL empowers restaurant employees with advanced querying and mutation capabilities, ensuring precise data retrieval as needed.
