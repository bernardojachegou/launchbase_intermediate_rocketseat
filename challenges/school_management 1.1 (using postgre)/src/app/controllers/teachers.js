const Teacher = require('../models/teacher');
const { age, date } = require("../../lib/utils");

module.exports = {
    index(request, response) {

        let { filter, page, limit } = request.query

        page = page || 1
        limit = limit || 4
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(teachers) {

                const pagination = {
                    total: Math.ceil(teachers[0].total / limit),
                    page
                }

                return response.render("teachers/index", { teachers, pagination, filter })
            }
        }

        Teacher.paginate(params)

    },

    create(request, response) {
        return response.render("teachers/create");
    },

    edit(request, response) {
        Teacher.find(request.params.id, function (teacher) {
            if (!teacher) return response.send("Teacher not found!")

            teacher.birth = date(teacher.birth_date).iso

            return response.render("teachers/edit", { teacher });

        })
    },

    post(request, response) {

        const keys = Object.keys(request.body);

        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill all the fields!")
            }
        }

        Teacher.create(request.body, function (teacher) {
            return response.redirect(`/teachers/${teacher.id}`)
        })
    },

    get(request, response) {
        Teacher.find(request.params.id, function (teacher) {
            if (!teacher) return response.send("Teacher not found!")

            teacher.age = age(teacher.birth_date);
            teacher.created_at = date(teacher.created_at).format;

            return response.render("teachers/read", { teacher });

        })
    },

    put(request, response) {

        const keys = Object.keys(request.body);

        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill all the fields!")
            }
        }

        Teacher.update(request.body, function () {
            return response.redirect(`/teachers/${request.body.id}`)
        })
    },

    delete(request, response) {

        Teacher.delete(request.body.id, function () {
            return response.redirect("teachers/");
        })
    }
}


