const express = require('express')
const {get, put, post} = require('../controler/modules/loanaccount')

const router = express.Router()

router.get("/", get)
router.put("/:id", put)
router.post("/", post)

module.exports = router