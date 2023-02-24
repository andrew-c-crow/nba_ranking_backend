const express = require("express")
const usersRouter = express.Router()
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env
const {requireUser} = require("./utils")

usersRouter.use("", (req, res, next) => {
    console.log("request has been made to users")
    next()
})

usersRouter.get("", requireUser, async (req, res, next) => {

})