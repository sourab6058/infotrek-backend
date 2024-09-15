const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.get("/users/:id", adminController.getUser);
router.get("/users", adminController.getUsers);

router.get("/events", adminController.getEvents);
router.patch("/events", adminController.createEvent);

module.exports = router;
