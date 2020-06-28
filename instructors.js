const fs = require("fs");
const data = require("./data.json");
const { age, date } = require("./utils");

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

// Update
exports.update = (request, response) => {

    const { id } = request.params;
    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id;
    })

    if (!foundInstructor) return response.send("Instructor not found!");

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }


    return response.render("instructors/update", { instructor })
}


// Delete