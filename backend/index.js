const express = require('express');
const cors = require('cors');
const routes = require("./routes/index")
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', routes);
app.get("/", (req, res) => res.send("welcome to user management api"));
// Start the server 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;