const express = require("express");
const routes = express.Router();

routes.get("/", (request, response) => {
    return response.redirect("/instructors");
})

routes.get("/instructors", (request, response) => {
    return response.render("instructors/index");
})

routes.get("/members", (request, response) => {
    return response.render("members/index");
})

module.exports = routes;
