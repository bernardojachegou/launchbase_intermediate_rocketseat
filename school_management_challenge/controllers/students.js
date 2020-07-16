const fs = require("fs");
const data = require("../data.json");
const { age, date } = require("../utils");

exports.index = (request, response) => {
    return response.render("students/index", {students: data.students});
}

exports.creating = (request, response) => {
    return response.render("students/create");
}

exports.edit = (request, response) => {
    const { id } = request.params;
    const foundStudent = data.students.find(function (student) {
        return student.id == id;
    })

    if (!foundStudent) return response.send("Student not found!");

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    return response.render("students/edit", { student })
}

// CRUD
exports.create = (request, response) => {

    const keys = Object.keys(request.body);

    for (key of keys) {
        if (request.body[key] == "") {
            return response.send("Please, fill all the fields!");
        }
    }

    birth = Date.parse(request.body.birth);

    let id = 1;
    const lastStudent = data.students[data.students.length - 1];

    if (lastStudent) {
        id = lastStudent.id + 1;
    }

    data.students.push({
        id,
        ...request.body,
        birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return response.send("Writing file error!")

        return response.redirect(`/students/${id}`)
    })

}

exports.read = (request, response) => {

    const { id } = request.params;
    const foundStudent = data.students.find(function (student) {
        return student.id == id;
    })

    if (!foundStudent) return response.send("Student not found!");

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).birthDay, 
        age: age(foundStudent.birth)
    }

    return response.render("students/read", { student });

}

exports.update = (request, response) => {

    const { id } = request.body;

    let index = 0;

    const foundStudent = data.students.find(function (student, foundIndex) {
        if (id == student.id) {
            index = foundIndex
            return true;
        }
    })

    if (!foundStudent) return response.send("Student not found!");

    const student = {
        ...foundStudent,
        ...request.body,
        birth: Date.parse(request.body.birth),
        id: Number(request.body.id)
    }

    data.students[index] = student;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return response.send("Could not include on date.json!")

        return response.redirect(`/students/${id}`);
    })
}

exports.delete = (request, response) => {
    const { id } = request.body;

    const filteredStudents = data.students.filter(function (student) {
        return student.id != id;
    })

    data.students = filteredStudents;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if(err) return response.send("Could not delete the selected student!");

        return response.redirect("/students");
    })
}