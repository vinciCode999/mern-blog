const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000; // Default to port 3000 if PORT is not defined

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
