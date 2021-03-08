const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

app.use(express.json(({ extended: false})));

// Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

// app.post('/hi', (req, res) => {
//     res.json({
//         "hi": "hola"
//     })
// });

const PORT = 5000;

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
