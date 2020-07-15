const fs = require("fs");
const data = require("../data.json");
const { age, date } = require("../utils");


exports.index = (request, response) => {


    return response.render("instructors/index", { instructors: data.instructors });
}

exports.creating = (request, response) => {
    return response.render("instructors/create");
}

// Lógica do CRUD
// Create
exports.create = (request, response) => {

    const keys = Object.keys(request.body);

    // Validação de dados;
    for (key of keys) {
        if (request.body[key] == "") {
            return response.send("Please, fill all the fields!")
        }
    }

    // Desestruturação de objeto;
    let { avatar_url, name, birth, gender, services } = request.body;

    birth = Date.parse(request.body.birth);

    const created_at = Date.now();
    const id = Number(data.instructors.length + 1);

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    })

    // Passar os dados dos inputs para um arquivo data.json em formato de array
    // Deve conter um array vazio;
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return response.send("Writing file error!")

        return response.redirect("/instructors")
    })
}

// Read
exports.read = (request, response) => {

    const { id } = request.params;
    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id;
    })

    if (!foundInstructor) return response.send("Instructor not found!");

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat('en-US').format(foundInstructor.created_at),
    }

    return response.render("instructors/read", { instructor });
}

// Edit
exports.edit = (request, response) => {

    const { id } = request.params;
    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id;
    })

    if (!foundInstructor) return response.send("Instructor not found!");

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso
    }


    return response.render("instructors/edit", { instructor })
}

// Update
exports.update = (request, response) => {

    const { id } = request.body;

    let index = 0;

    const foundInstructor = data.instructors.find(function (instructor, foundIndex) {
        if (id == instructor.id) {
            index = foundIndex
            return true;
        }
    })

    if (!foundInstructor) return response.send("Instructor not found!");

    const instructor = {
        ...foundInstructor,
        ...request.body,
        birth: Date.parse(request.body.birth),
        id: Number(request.body.id)
    }

    data.instructors[index] = instructor;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return response.send("Could not update file!")

        return response.redirect(`/instructors/${id}`);
    })

}

// Delete
exports.delete = (request, response) => {
    const { id } = request.body;

    const filteredInstructors = data.instructors.filter(function (instructor) {
        return instructor.id != id;
    })

    data.instructors = filteredInstructors;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return console.log("Could not delete the profile!");

        return response.redirect("/instructors");
    })
}