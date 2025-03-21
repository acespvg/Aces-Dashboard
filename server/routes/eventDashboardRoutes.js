const express = require("express");
const router = express.Router();
const { getAllEvents } = require("../controllers/eventDashboardController");

router.get("/", getAllEvents);

module.exports = router;
