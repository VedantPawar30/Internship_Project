const express = require('express')
const router =express.Router()

//Import Controller
const {searchKeyword} =require('../controllers/searchController')

//Routes
router.get('/:query', searchKeyword)

module.exports =router