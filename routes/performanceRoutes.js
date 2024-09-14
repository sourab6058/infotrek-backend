const express = require("express");
const router = express.Router();
const performanceController = require("../controllers/performanceController")

router.post("/", performanceController.createPerformance)
router.get("/:game_id", performanceController.getPerformance)
router.get("/leaderboard/:game_id", performanceController.getLeaderBoard)
module.exports = router;
