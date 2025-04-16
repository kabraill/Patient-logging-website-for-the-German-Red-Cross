# Patient-logging-website-for-the-German-Red-Cross

This project consists of three main components:

- **frontend/** – Web client (React):
  The web client, developed with React, offers users an intuitive interface for entering and displaying patient data. The user interface is designed for ease of use in stressful emergency situations.
- **backend/** – Server-side API (Node.js):
  The server-side API, developed in Node.js, is responsible for processing and storing patient data. It provides interfaces for data exchange with the frontend and manages communication with the database.
- **dynamic_generator/** – dynamic version of web client (React):
  This component is also based on React, but generates the user interface dynamically based on an external JSON configuration file. Developers can define new forms, fields, or logic by modifying this JSON file without having   to directly change the application code. This makes the web application flexibly adaptable and easy to respond to new requirements or deployment scenarios of the German Red Cross.
