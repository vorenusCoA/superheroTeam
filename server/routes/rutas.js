const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller")

router.get("/search/:name", controller.findByName);
router.get("/superhero/:id", controller.getSuperheroById);

module.exports = router;