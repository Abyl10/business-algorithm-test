# Business Algorithm Test

This project is a full-stack application designed for managing user authentication, employee profiles, and work records. It leverages the MERN stack (MongoDB, Express, React, Node.js) to provide a comprehensive solution for business management tasks.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js
- npm (Node Package Manager)
- MongoDB (or access to a MongoDB database)

### Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/Abyl10/business-algorithm-test.git
cd business-algorithm-test
```


Setting Up the Server
Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a .env file in the server directory with the following contents:

```
MONGODB_DATABASE=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret_key
```

Start the server: 

```bash
npm start
```

Setting Up the Client
Open a new terminal window, navigate to the client directory from the project root, and install dependencies:

```
cd client
npm install
```

Start the React development server:
```
npm run dev
```

The client application should now be accessible at http://localhost:3000.


## Build with
MongoDB
Express.js
React (Vite, MaterialUI, TailwindCSS)
Node.js 