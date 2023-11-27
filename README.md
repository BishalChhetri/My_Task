# Getting Started with Create React App

This project was simple task to add the name and sectors involved for that person.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

### Steps involved to run this application

Create .env files: Before running the application, create a .env file in the project root and save the environment variables:
REACT_APP_MYSQL_PW=****
REACT_APP_SERVER_URL=http://localhost:8080

Locate MySQL dump file: Find the directory where your MySQL dump file is saved.

Create a database: Create a new database and ensure that the database configuration file is updated with the name of the newly created database.

mysqldump -u your_username -p your_database_name < dump_file.sql

Install necessary modules: Run npm install or yarn add to import all the required modules specified in package.json.

Start the application: Run the command npm run start to start the application.
