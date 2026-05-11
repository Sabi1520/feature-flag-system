const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const featureRoutes = require("./routes/featureRoutes");

const app = express();

app.use(cors());
app.use(express.json());


// ROUTES

app.use("/api/auth", authRoutes);

app.use("/api/organizations", organizationRoutes);

app.use("/api/features", featureRoutes);


// TEST ROUTE

app.get("/", (req, res) => {
    res.send("Server Running Successfully");
});


// SERVER

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});