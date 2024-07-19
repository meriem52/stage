const app = require('./app');
const { PORT } = require('./config/appConfig');
require('./config/dbConfig');
require('dotenv').config();


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



