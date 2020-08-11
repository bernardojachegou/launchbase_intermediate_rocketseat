const { age, date } = require("../../lib/utils");

module.exports = {
    index(request, response) {
        return response.render("members/index", { members: data.members });
    },

    create(request, response) {
        return response.render("members/create");
    },

    edit(request, response) {
        const { id } = request.params;
        const foundMember = data.members.find(function (member) {
            return member.id == id;
        })

        if (!foundMember) return response.send("Member not found!");

        const member = {
            ...foundMember,
            birth: date(foundMember.birth).iso
        }


        return response.render("members/edit", { member })
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