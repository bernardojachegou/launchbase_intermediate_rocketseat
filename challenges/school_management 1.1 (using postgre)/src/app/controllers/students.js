const Student = require('../models/student');
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
            callback(students) {

                const pagination = {
                    total: Math.ceil(students[0].total / limit),
                    page
                }

                return response.render("students/index", { students, pagination, filter })
            }
        }

        Student.paginate(params)

    },

    create(request, response) {

        Student.teachersSelectOptions(function (options) {
            return response.render("students/create", { teacherOptions: options });
        })
    },

    edit(request, response) {
        Student.find(request.params.id, function (student) {
            if (!student) return response.send("Student not found!")

            student.birth = date(student.birth_date).iso

            Student.teachersSelectOptions(function (options) {
                return response.render("students/edit", { student, teacherOptions: options });
            })

        })
    },

    post(request, response) {

        const keys = Object.keys(request.body);

        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill all the fields!")
            }
        }

        Student.create(request.body, function (student) {
            return response.redirect(`/students/${student.id}`)
        })
    },

    get(request, response) {
        Student.find(request.params.id, function (student) {
            if (!student) return response.send("Student not found!")

            student.age = age(student.birth_date);
            student.birth = date(student.created_at).birthDay;

            return response.render("students/read", { student });

        })
    },

    put(request, response) {

        const keys = Object.keys(request.body);

        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill all the fields!")
            }
        }

        Student.update(request.body, function () {
            return response.redirect(`/students/${request.body.id}`)
        })
    },

    delete(request, response) {

        Student.delete(request.body.id, function () {
            return response.redirect("students/");
        })
    }
}


