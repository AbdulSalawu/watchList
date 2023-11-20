// import modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', routesHandler);

// backend routing port 4000
const PORT = 4000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});