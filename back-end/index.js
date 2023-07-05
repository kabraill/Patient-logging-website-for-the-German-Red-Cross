const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoute = require("./routes/user");
const protocol_draft_Route = require("./routes/protocol_draft");
const protocol_finished_Route = require("./routes/protocol_finished");

const DraftProtocol = require("./models/protocol_draft");
const FinishedProtocol = require("./models/protocol_finished");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to the database");
        // Delete expired draft protocols every hour 3600000
        setInterval(deleteExpiredDraftProtocols, 3600000);
        setInterval(deleteExpiredFinishedProtocols, 10000);
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

app.use("/user", userRoute);
app.use("/protocol_draft", protocol_draft_Route);
app.use("/protocol_finished", protocol_finished_Route);

app.listen(8800, () => {
    console.log("Backend server is running!");
});


async function deleteExpiredDraftProtocols() {
    const currentTime = new Date();

    try {

        const drafts = await DraftProtocol.find({});

        for (const draft of drafts) {
            if (draft.content.length > 0) {
                draft.content = draft.content.filter((elem) => new Date(elem.delete_time) > currentTime);
                await draft.save();
            }
        }
        await DraftProtocol.deleteMany({ 'content': { $size: 0 } });
    } catch (error) {
        console.log("Error deleting expired draft protocols:", error);
    }
}

async function deleteExpiredFinishedProtocols() {
    const currentTime = new Date();

    try {

        const drafts = await FinishedProtocol.find({});

        for (const draft of drafts) {
            if (draft.content.length > 0) {
                draft.content = draft.content.filter((elem) => new Date(elem.delete_time) > currentTime);
                await draft.save();
            }
        }
        await FinishedProtocol.deleteMany({ 'content': { $size: 0 } });
    } catch (error) {
        console.log("Error deleting expired draft protocols:", error);
    }
}
