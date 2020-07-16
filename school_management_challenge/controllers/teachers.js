const fs = require("fs");
const data = require("../data.json");
const { age, date } = require("../utils");

exports.index = (request, response) => {
    return response.render("teachers/index", {teachers: data.teachers});
}

exports.creating = (request, response) => {
    return response.render("teachers/create");
}

exports.edit = (request, response) => {
    const { id } = request.params;
    const foundTeacher = data.teachers.find(function (teacher) {
        return teacher.id == id;
    })

    if (!foundTeacher) return response.send("Teacher not found!");

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso
    }

    return response.render("teachers/edit", { teacher })
}

// CRUD
exports.create = (request, response) => {

    const keys = Object.keys(request.body);

    for (key of keys) {
        if (request.body[key] == "") {
            return response.send("Please, fill all the fields!");
        }
    }

    let { avatar_url, name, birth, education_level, class_category, educational_area } = request.body;

    birth = Date.parse(request.body.birth);

    const created_at = Date.now();
    const id = Number(data.teachers.length + 1);

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        education_level,
        class_category,
        educational_area,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return response.send("Writing file error!")

        return response.redirect(`/teachers/${id}`)
    })

}

exports.read = (request, response) => {

    const { id } = request.params;
    const foundTeacher = data.teachers.find(function (teacher) {
        return teacher.id == id;
    })

    if (!foundTeacher) return response.send("Teacher not found!");

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        created_at: new Intl.DateTimeFormat('en-US').format(foundTeacher.created_at),
    }

    return response.render("teachers/read", { teacher });

}

exports.update = (request, response) => {

    const { id } = request.body;

    let index = 0;

    const foundTeacher = data.teachers.find(function (teacher, foundIndex) {
        if (id == teacher.id) {
            index = foundIndex
            return true;
        }
    })

    if (!foundTeacher) return response.send("Teacher not found!");

    const teacher = {
        ...foundTeacher,
        ...request.body,
        birth: Date.parse(request.body.birth),
        id: Number(request.body.id)
    }

    data.teachers[index] = teacher;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return response.send("Could not include on date.json!")

        return response.redirect(`/teachers/${id}`);
    })
}

exports.delete = (request, response) => {
    const { id } = request.body;

    const filteredTeachers = data.teachers.filter(function (teacher) {
        return teacher.id != id;
    })

    data.teachers = filteredTeachers;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if(err) return response.send("Could not delete the selected teacher!");

        return response.redirect("/teachers");
    })
}