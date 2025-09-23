const express = require("express")
const router = express.Router()
const homeControllers = require("./controllers/homeControllers")

router.get("/", homeControllers.home)
router.get("/create-embeddings", homeControllers.createDataEmbeddings)
router.post("/gen-answer", homeControllers.genAnswer)

module.exports = router
