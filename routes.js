const express = require("express");
const routes = express.Router();
const instructors = require("./instructors");

routes.get("/", (request, response) => {
    return response.redirect("/instructors");
})

routes.get("/instructors", instructors.index);

routes.get("/instructors/create", (request, response) => {
    return response.render("instructors/create");
})

routes.post("/instructors", instructors.create);

routes.get("/instructors/:id", instructors.read);

routes.get("/instructors/:id/edit", instructors.edit);

routes.put("/instructors", instructors.update);

routes.delete("/instructors", instructors.delete);


routes.get("/members", (request, response) => {
    return response.render("members/index");
})

module.exports = routes;
