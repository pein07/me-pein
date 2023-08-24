const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Connect to the SQLite database
const db = new sqlite3.Database('database.db');

// Create a table for users
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT)");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the signup page
app.get('/logout', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Handle signup form submissions
//app.post('/signup', (req, res) => {
//  const { username, email, password } = req.body;

//app.post('/signup', (req, res) => {
//  const { username, email, password } = req.body;

  // Check if all fields are provided
//  if (!username || !email || !password) {
//    res.send('Please provide all the required information');
//    return;
//  }
//
  // Insert user data into the database
//  db.run("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, password], (err) => {
//    if (err) {
//      console.error(err);
//      res.send('Error occurred during signup');
//    } else {
//      res.send('Signup successful');
//    }
//  });
//});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Trim whitespace from input values
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();

  // Check if the trimmed username and password match the stored values
  if (trimmedUsername === 'stored_username' && trimmedPassword === 'stored_password') {
    // Allow login for the specific individual
    res.send('Login successful');
  } else {
    // Deny login for others
    res.send('Invalid username or password');
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
