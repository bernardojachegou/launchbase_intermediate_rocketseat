const { age, date } = require("../../lib/utils");

module.exports = {
    index(request, response) {
        return response.render("instructors/index", { instructors: data.instructors });
    },

    create(request, response) {
        return response.render("instructors/create");
    },

    edit(request, response) {
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
    },

    post(request, response) {

        const keys = Object.keys(request.body);

        // Validação de dados;
        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill all the fields!")
            }
        }

        // Desestruturação de objeto;
        let { avatar_url, name, birth, gender, services } = request.body;

        return
    },

    get(request, response) {
        return
    },

    put(request, response) {
        // Validação de dados;
        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill all the fields!")
            }
        }

        return
    },

    delete(request, response) {
        return
    },

};