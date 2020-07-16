const express = require("express");
const routes = express.Router();
const teachers = require("./controllers/teachers");
const students = require("./controllers/students");

routes.get("/", (request, response) => {
    return response.redirect("/teachers");
})

routes.get("/teachers", teachers.index);
routes.get("/teachers/create", teachers.creating);
routes.get("/teachers/:id/edit", teachers.edit);

routes.post("/teachers", teachers.create);
routes.get("/teachers/:id", teachers.read);
routes.put("/teachers", teachers.update);
routes.delete("/teachers", teachers.delete);

routes.get("/students", students.index);
routes.get("/students/create", students.creating);
routes.get("/students/:id/edit", students.edit);

routes.post("/students", students.create);
routes.get("/students/:id", students.read);
routes.put("/students", students.update);
routes.delete("/students", students.delete);

module.exports = routes;