const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");

const userRouter = require("./routes/userRoutes");
const gameRouter = require("./routes/gameRoutes");
const performanceRouter = require("./routes/performanceRoutes");
const eventRouter = require("./routes/eventRoutes");
const adminRouter = require("./routes/adminRoutes");

const app = express();
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;

app.use(express.json({ limit: "100kb" }));
app.use(cors({ origin: "*", exposedHeaders: "Content-Range" }));

app.options("/", cors());

app.use("/api/users", userRouter);
app.use("/api/games", gameRouter);
app.use("/api/performance", performanceRouter);
app.use("/api/event", eventRouter);
app.use("/api/admin", adminRouter);

app.use("/public", express.static(path.join(__dirname, "./public")));

app.get("/", (req, res) => {
  res.send("working");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
