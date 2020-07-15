const fs = require("fs");
const data = require("../data.json");
const { date } = require("../utils");


exports.index = (request, response) => {


    return response.render("members/index", { members: data.members });
}

exports.creating = (request, response) => {
    return response.render("members/create");
}

exports.edit = (request, response) => {

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
}

// =============== CRUD ===============
// Create
exports.create = (request, response) => {

    const keys = Object.keys(request.body);

    // Validação de dados;
    for (key of keys) {
        if (request.body[key] == "") {
            return response.send("Please, fill all the fields!")
        }
    }

    birth = Date.parse(request.body.birth);

    let id = 1;
    const lastMember = data.members[data.members.length - 1];

    if (lastMember) {
        id = lastMember.id + 1;
    }

    data.members.push({
        id,
        ...request.body,
        birth
    })

    // Passar os dados dos inputs para um arquivo data.json em formato de array
    // Deve conter um array vazio;
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return response.send("Writing file error!")

        return response.redirect("/members")
    })
}

// Read
exports.read = (request, response) => {

    const { id } = request.params;
    const foundMember = data.members.find(function (member) {
        return member.id == id;
    })

    if (!foundMember) return response.send("Member not found!");

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay,
    }

    return response.render("members/read", { member });
}

// Update
exports.update = (request, response) => {

    const { id } = request.body;

    let index = 0;

    const foundMember = data.members.find(function (member, foundIndex) {
        if (id == member.id) {
            index = foundIndex
            return true;
        }
    })

    if (!foundMember) return response.send("Member not found!");

    const member = {
        ...foundMember,
        ...request.body,
        birth: Date.parse(request.body.birth),
        id: Number(request.body.id)
    }

    data.members[index] = member;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return response.send("Could not update file!")

        return response.redirect(`/members/${id}`);
    })

}

// Delete
exports.delete = (request, response) => {
    const { id } = request.body;

    const filteredMembers = data.members.filter(function (member) {
        return member.id != id;
    })

    data.members = filteredMembers;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return console.log("Could not delete the profile!");

        return response.redirect("/members");
    })
}