const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// midle ward 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Quick Eat Server is Running');
});

app.listen(port, () => {
    console.log(`Quick Eat Server on port ${port}`);
});