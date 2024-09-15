const express = require("express");
const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/", eventController.createEvent);
router.post(
  "/register",

  authController.protect,
  eventController.registerEvent
);

router.post(
  "/unregister",

  authController.protect,
  eventController.unRegisterEvent
);
router.patch(
  "/",
  authController.protect,
  authController.authorizeAdmin,
  eventController.updateEvent
);
router.delete(
  "/",
  authController.protect,
  authController.authorizeAdmin,
  eventController.deleteEvent
);
router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEvent);

module.exports = router;
