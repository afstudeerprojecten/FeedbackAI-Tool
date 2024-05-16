# FeedbackAI Tool Frontend

## Overview
The FeedbackAI Tool Frontend is a web application designed to assist teachers in providing feedback on student assignments using OpenAI's API. The system allows teachers to create template solutions, manage courses, and review student submissions.

## Features
- **Course Management:** Teachers can create and manage courses, organizing assignments within each course.
- **Assignment Creation:** Teachers can define assignments, give a description of the assignment and the amount of template solutions they want.
- **Student Submissions:** Students can submit their work for assignments, which is then processed by the system for feedback.
- **Feedback Generation:** OpenAI's API is utilized to generate feedback on student submissions, providing hints and suggestions for improvement.
- **Reviewing Submissions:** Teachers can review student submissions, view generated feedback, and provide additional comments or grades.
- **Final Submission:** Students can submit their revised assignments for final review by the teacher.


 **Login:**
   - Use the provided login functionality to access the system.
   - If no login credentials are available, register an account.

 **Navigation:**
   - Use the navigation menu to access different features such as course management, assignment creation, and student submissions.

## Technologies Used
- React.js
- React Router
- OpenAI API (for feedback generation)
- Tailwind CSS (for styling)


## Configuration

>READ THIS PLEASE!!!

We're using environment variables to configure stuff. You're expected to create a `.env` file in the root of the project and set this variable. 
```bash
VITE_BACKEND_URL=http://localhost:8080
```

A full example is provided in `example.env`.

**THIS IS A BREAKING CHANGE!** It wasn't like this before!

### Developer notice

By default, environment variables that are undefined should default to `CONFIG_<VARIABLE_NAME>`. This is important for deploying using Docker. You can use this snippet as a reference:

```ts
const API_URL = import.meta.env.VITE_BACKEND_URL ?? "CONFIG_BACKEND_URL";  
             // This is to get the env var       if null, return CONFIG_BACKEND_URL
```

## Running the project

### In Docker

```bash
docker build . -t feedbackai-frontend
docker run -e CONFIG_BACKEND_URL='http://localhost:8080' -p 3000:80 feedbackai-frontend
```