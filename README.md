# ExpenseTracker

A full-stack expense tracking application built with React, Node.js, Express, and MongoDB. Keep track of your expenses by category and get notified when you exceed spending limits (in our case it is 1000$).

## Features

- 📱 User-friendly interface built with React and Bootstrap
- 💰 Track expenses with amount and description
- 🔔 Email notifications when spending limit is exceeded
- 🗑️ Easy deletion of expenses and categories

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- React Bootstrap for UI components
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Resend for email notifications
- CORS for cross-origin resource sharing

## Prerequisites

Before running this application, make sure you have:
- Node.js installed (v14 or higher)
- MongoDB installed and running
- A Resend API key for email notifications

## Installation

1. Clone the repository:
```bash
git clone https://github.com/henri-tabaku/expense-tracker.git
cd expense-tracker
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

4. Configure environment variables:
   - Create a `.env` file in the `server` directory.
   - Copy the variable names from `server/.env.example` and fill them with your own values. Example (`server/.env`):

    # server/.env (example)
    MONGO_URI=<your-mongodb-connection-string>
    PORT=5000
    RESEND_API_KEY=<your-resend-api-key>

## Running the Application

1. Start the server:
```bash
cd server
npm run dev
```

2. Start the client:
```bash
cd client
npm run start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Categories
- GET `/api/categories/:email` - Get all categories for a user
- POST `/api/categories` - Create a new category
- DELETE `/api/categories/:id` - Delete a category

### Expenses
- GET `/api/expenses/:email` - Get all expenses for a user
- POST `/api/expenses` - Create a new expense
- DELETE `/api/expenses/:id` - Delete an expense

## Email / Budget Alert Behavior

An email notification is sent when creating an expense causes the total expenses for a given user (identified by the `email` parameter used in the API) to exceed the budget threshold (default: $1000). The server checks the user's current total and, if the new expense pushes the total over the limit, it attempts to send an email via Resend. Email failures are logged and do not crash the server. The emails are currently sent to 'ildabiba6@gmail.com' in lack of a valid personal domain.

## Security

- Keep credentials and API keys in `server/.env` (local only). `server/.env.example` shows which variables are required. The values will be provided through email from me.

## Time spent & Decisions

- Time spent (approx): 4 hours
- Key decisions:
   - Used Resend for email notifications (simple API, developer-friendly).
   - Budget threshold: $1000 (triggered when an added expense pushes total over this limit).
   - Categories and expenses are stored in separate MongoDB collections (flat structure).

## Author

Ilda Biba