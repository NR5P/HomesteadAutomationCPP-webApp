const express = require("express");
const path = require("path");
const app = express();

//static folders
app.use(express.static(path.join(__dirname, "web")));

const PORT = process.env.PORT || 5000; // check port number environment variable first
    
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));