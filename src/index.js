const express = require("express");
const { ServerConfig } = require("./config")
const apiRoutes = require('./routes');
const mongoose = require("mongoose");
const app = express();



// MongoDB connection
mongoose
    .connect(ServerConfig.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api', apiRoutes)
app.listen(ServerConfig.PORT, () => {
    console.log(`Server is running on port ${ServerConfig.PORT}`);
})