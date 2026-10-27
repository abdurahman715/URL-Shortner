# URL Shortener

A full-stack URL shortener built with React, Node.js, Express.js, and MongoDB. Convert long URLs into short, shareable links with QR code generation and convenient copy functionality.

## Features

* **URL Shortening:** Convert long URLs into short, shareable links.
* **QR Code Generation:** Generate QR codes for shortened URLs.
* **QR Code Download:** Download generated QR codes for later use.
* **Copy to Clipboard:** Copy shortened URLs with a single click.
* **REST API:** Communicate between the frontend and backend through REST APIs.
* **Responsive UI:** Access the application across different screen sizes.
* **Error Handling:** Display loading states and handle API errors.

## Tech Stack

### Frontend

* React
* JavaScript
* Tailwind CSS
* Axios
* React QR Code

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Nano ID

## Project Structure

```text
url-shortener/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── package.json
│
├── server/
│   ├── models/
│   │   └── Url.js
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

*Note: Adjust the folder structure above to match your actual repository.*

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB database
* Git

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd url-shortener
```

Replace `YOUR_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Set Up the Backend

Navigate to the backend directory:

```bash
cd server
npm install
```

Create a `.env` file in the backend directory and configure your environment variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Make sure your backend code uses these environment variable names. Update them if your project uses different names.

Start the backend server:

```bash
npm start
```

### 3. Set Up the Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd client
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed in your terminal to use the application.

## How It Works

1. Enter a long URL into the input field.
2. Submit the URL to the backend API.
3. The backend generates a unique short identifier.
4. The URL and its identifier are stored in MongoDB.
5. The application displays the shortened URL.
6. Copy the shortened URL or generate and download its QR code.

## Environment Variables

| Variable           | Description                               |
| ------------------ | ----------------------------------------- |
| `PORT`             | Port used by the backend server           |
| `MONGODB_URI`      | MongoDB connection string                 |
| `VITE_BACKEND_URL` | Backend API base URL used by the frontend |

Keep your `.env` files private. Never commit database credentials or other secrets to GitHub.

## Future Improvements

* URL click analytics
* Custom short URLs
* Link expiration
* User authentication
* Dashboard for managing shortened links
* Rate limiting and additional API security
* Deployment with a custom domain

## Learning Outcomes

This project helped me practice:

* Full-stack application development
* REST API development and integration
* MongoDB database operations
* Asynchronous JavaScript and error handling
* Environment variable configuration
* Frontend-backend communication
* Building responsive user interfaces

## Author

**Abdurahman CK**

* GitHub: [@abdurahman715](https://github.com/abdurahman715)
* LinkedIn: [Muhammed Abdurahman CK](https://linkedin.com/in/muhammed-abdurahman-ck)
* Email: [abdurahmanck715@gmail.com](mailto:abdurahmanck715@gmail.com)

---

If you find this project useful, consider giving the repository a star!

**Built with dedication by Abdurahman CK.**
