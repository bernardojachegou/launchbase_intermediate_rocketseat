const express = require("express");
const routes = express.Router();
const instructors = require("./app/controllers/instructors");
const members = require("./app/controllers/members");

routes.get("/", (request, response) => {
    return response.redirect("/instructors");
})

routes.get("/instructors", instructors.index);
routes.get("/instructors/create", instructors.create);
routes.get("/instructors/:id/edit", instructors.edit);
routes.post("/instructors", instructors.post);
routes.get("/instructors/:id", instructors.get);
routes.put("/instructors", instructors.put);
routes.delete("/instructors", instructors.delete);

routes.get("/members", members.index);
routes.get("/members/create", members.create);
routes.get("/members/:id/edit", members.edit);
routes.post("/members", members.post);
routes.get("/members/:id", members.get);
routes.put("/members", members.put);
routes.delete("/members", members.delete);

module.exports = routes;
