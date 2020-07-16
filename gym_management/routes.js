const express = require("express");
const routes = express.Router();
const instructors = require("./controllers/instructors");
const members = require("./controllers/members");

routes.get("/", (request, response) => {
    return response.redirect("/instructors");
})

routes.get("/instructors", instructors.index);
routes.get("/instructors/create", instructors.creating);
routes.get("/instructors/:id/edit", instructors.edit);

routes.post("/instructors", instructors.create);
routes.get("/instructors/:id", instructors.read);
routes.put("/instructors", instructors.update);
routes.delete("/instructors", instructors.delete);

routes.get("/members", members.index);
routes.get("/members/create", members.creating)
routes.get("/members/:id/edit", members.edit);

routes.post("/members", members.create);
routes.get("/members/:id", members.read);
routes.put("/members", members.update);
routes.delete("/members", members.delete);

module.exports = routes;
