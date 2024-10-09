# AWS Quiz App

The **AWS Quiz App** is a web application designed to help users take quizzes about AWS services and concepts. The application supports creating question sets, taking timed quizzes, and calculating and storing results based on the user's performance.

## Features

- **User Authentication**: Users can sign in to access quizzes (this can be extended with authentication mechanisms like OAuth, JWT, etc.).
- **Question Set Creation**: Admins or users can create question sets with multiple-choice questions.
- **Timed Quiz**: Each quiz is timed, and the remaining time is shown on the quiz page.
- **Results Calculation**: After completing a quiz, users' scores and percentages are calculated based on the total points.
- **Persistent Data**: Scores and results are saved in the database, allowing users to review their performance later.
- **Delete Functionality**: Admins can delete question sets, which will also cascade and delete associated questions and results.

## Technology Stack

- **Frontend**: 
  - React.js
  - Tailwind CSS for styling
- **Backend**: 
  - Node.js, Express.js
  - MySQL for the database
- **API Client**: Axios for API requests

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) installed
- [MySQL](https://www.mysql.com/) installed and running

### Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/aws-quiz-app.git

2. **Install backend dependencies:**:

    Navigate to the backend folder and install dependencies:

    ```bash
    cd aws-quiz-app/backend
    npm install

3. **Install frontend dependencies:**:

    Navigate to the frontend folder and install dependencies:

    ```bash
    cd ../frontend
    npm install

4. **Configure Environment Variables:**:

    Create a .env file in the backend directory with the following:

    ```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=aws_quiz_app

5. **Run the Application:**:

    Start the backend server:

    ```bash
    cd backend
    npm run dev
    ```

    Start the frontend server:

    ```bash
    cd frontend
    npm run start
    ```

5. **Database Setup:**:
    
    Create a MySQL database:

    ```bash
    CREATE DATABASE aws_quiz_app;
    ```

    Import the database schema (found in backend/schema.sql) to create the necessary tables:

    ```bash
    mysql -u root -p aws_quiz_app < backend/schema.sql
    ```

## API Endpoints

### Quiz Endpoints

- **Get All Question Sets**: `GET /api/question-sets`
- **Get Questions by Set ID**: `GET /api/question-sets/:id`
- **Submit Quiz**: `POST /api/submit`
- **Delete Question Set**: `DELETE /api/question-sets/:id`
- **Create Question Set**: `POST /api/save-question-set`


## File Structure

    aws-quiz-app/
    │
    ├── backend/
    │   ├── controllers/        # API logic for handling requests
    │   ├── models/             # Database models and schema
    │   ├── routes/             # Express routes
    │   ├── index.js           # Main entry point for backend
    │   
    │   └── .env                # Environment variables for backend
    │
    ├── frontend/
    │   ├── src/
    │   │   ├── components/     # React components
    │   │   ├── App.js          # Main app component
    │   │   ├── utils/         # API call functions using Axios
    │   └── public/             # Public assets like index.html
    │
    ├── README.md
    └── package.json


## How It Works

1. **Question Set Creation**: Admins create question sets with options, correct answers, and a timer.
2. **Taking the Quiz**: Users select answers within the given time limit.
3. **Submitting the Quiz**: Users' answers are evaluated, and the score and percentage are calculated and stored.
4. **View Results**: Users can view their scores and percentages after submission.

## Contributions

Feel free to open a pull request or raise an issue if you'd like to contribute!









