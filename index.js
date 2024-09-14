const dotenv = require("dotenv");
const express = require('express');
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const gameRouter = require("./routes/gameRoutes");
const performanceRouter = require("./routes/performanceRoutes");
const initDB = require("./DB/initializeDB");
const app = express();
const PORT = 3000;
dotenv.config({path: "./config.env"});

app.use(express.json({limit: "100kb"}));
app.use(cors({origin: "*"}));

app.options("/", cors());


app.use("/api/users", userRouter);
app.use("/api/games", gameRouter);
app.use("/api/performance", performanceRouter);

(async () => {
    const db = await initDB.initializeDB();
    if (db) {
        console.log("DB connected successfully");
    } else {
        console.log(db);
    }
})();

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})
