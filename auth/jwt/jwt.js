const express = require('express');
const app = express();

app.get('/home', (req, res) => {
  res.send('Home Page');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.get('/services', (req, res) => {
  res.send('Services Page');
});

app.get('/projects', (req, res) => {
  res.send('Projects Page');
});

app.get('/blog', (req, res) => {
  res.send('Blog Page');
});

app.get('/careers', (req, res) => {
  res.send('Careers Page');
});

app.get('/contact', (req, res) => {
  res.send('Contact Page');
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
