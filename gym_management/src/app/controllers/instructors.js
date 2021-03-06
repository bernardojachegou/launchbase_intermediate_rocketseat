const Instructor = require('../models/instructor');
const { age, date } = require('../../lib/utils');

module.exports = {
    index(request, response) {
        let { filter, page, limit } = request.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(instructors) {

                const pagination = {
                    total: Math.ceil(instructors[0].total / limit),
                    page
                }

                return response.render("instructors/index", { instructors, pagination, filter })
            }
        }

        Instructor.paginate(params)

    },

    create(request, response) {
        return response.render("instructors/create");
    },

    edit(request, response) {
        Instructor.find(request.params.id, function (instructor) {
            if (!instructor) return response.send("Instructor not found!")

            instructor.birth = date(instructor.birth).iso

            return response.render("instructors/edit", { instructor });

        })
    },

    post(request, response) {

        const keys = Object.keys(request.body);

        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill all the fields!")
            }
        }

        Instructor.create(request.body, function (instructor) {
            return response.redirect(`/instructors/${instructor.id}`)
        })
    },

    get(request, response) {
        Instructor.find(request.params.id, function (instructor) {
            if (!instructor) return response.send("Instructor not found!")

            instructor.age = age(instructor.birth);
            instructor.services = instructor.services.split(",");
            instructor.created_at = date(instructor.created_at).format;

            return response.render("instructors/read", { instructor });

        })
    },

    put(request, response) {

        const keys = Object.keys(request.body);

        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill all the fields!")
            }
        }

        Instructor.update(request.body, function () {
            return response.redirect(`/instructors/${request.body.id}`)
        })
    },

    delete(request, response) {

        Instructor.delete(request.body.id, function () {
            return response.redirect("instructors/");
        })
    }

};