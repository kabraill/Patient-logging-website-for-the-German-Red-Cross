const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/user");
//const postRoute = require("./routes/protocol_draft");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to the database");
        // Your server code or other operations


    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Replace "*" with the appropriate origin URL in production
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//app.use("/protocol_draft", authRoute);
app.use("/user", userRoute);


app.listen(8800, () => {
    console.log("Backend server is running!");
});