const express = require("express");
const nunjucks = require("nunjucks");
const routes = require("./routes");
const methodOverride = require('method-override');

const server = express();

server.use(express.urlencoded({extended: true})); // Responsável por ativar o request.body
server.use(express.static("public"));
server.use(methodOverride('_method')); // Responsável por permitir os métodos PUT / DELETE
server.use(routes);


server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(5000, function () {
    console.log("server is running");
})