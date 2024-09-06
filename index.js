const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // To load environment variables

const app = express();

// console.log('PORT:', process.env.PORT); // Should output 5000

app.use(cors({
    origin: 'https://job-app-backend-three.vercel.app/', // Allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }));

app.use(express.json());
app.use(express.urlencoded({extended:true}))

mongoose.connect(process.env.MONGO_URI)
.then(function(){
    console.log('jobApp db connected sucessfully');
})
.catch(function(){
    console.log('jobApp db is not connected');
})


app.get('/test', (req, res) => {
    res.send('Test route from index.js is working');
});


//auth routes start here
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes );

//job routes start here
const jobFormRoutes = require('./routes/jobFormRoutes');
app.use('/adminJob', jobFormRoutes );



// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));