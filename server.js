// Add requirements for express.js as well as the routing files used
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const app = express();

// Sets port to use for server
const PORT = process.env.PORT || 3001;

// Sets all express menthods as well as the routing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Creates the server with the appropriate port
app.listen(PORT, () => {
    console.log(`Now listening on PORT: ${PORT}`);
});