const Member = require('../models/member');
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
            callback(members) {

                const pagination = {
                    total: Math.ceil(members[0].total / limit),
                    page
                }

                return response.render("members/index", { members, pagination, filter })
            }
        }

        Member.paginate(params)
    },

    create(request, response) {

        Member.instructorsSelectOptions(function (options) {
            return response.render("members/create", { instructorOptions: options });
        })

    },

    edit(request, response) {
        Member.find(request.params.id, function (member) {
            if (!member) return response.send("Member not found!")

            member.birth = date(member.birth).iso

            Member.instructorsSelectOptions(function (options) {
                return response.render("members/edit", { member, instructorOptions: options });
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

        Member.create(request.body, function (member) {
            return response.redirect(`/members/${member.id}`)
        })
    },

    get(request, response) {
        Member.find(request.params.id, function (member) {
            if (!member) return response.send("Member not found!")

            member.birth = date(member.birth).birthDay;

            return response.render("members/read", { member });

        })
    },

    put(request, response) {

        const keys = Object.keys(request.body);

        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill all the fields!")
            }
        }

        Member.update(request.body, function () {
            return response.redirect(`/members/${request.body.id}`)
        })
    },

    delete(request, response) {

        Member.delete(request.body.id, function () {
            return response.redirect("members/");
        })
    },

};