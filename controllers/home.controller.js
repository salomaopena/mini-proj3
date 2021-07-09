const fs = require("fs")
const Handlebars = require("handlebars")

exports.get = (req, res) => {

    const home = fs.readFileSync(__dirname + "/../views/home.handlebars", "utf8");

    const compiled_page = Handlebars.compile(home)({
        title: "Animalec API",
        style: {
            background_color: "#2b589f",
            text_color: "#FFFFFF"
        },
        content: {
            logo: "../images/logo.png",
            title: "ANIMALEC API",
            text: 'API do Livro da FCA "Desenvolvimento Avançado para a Web"'
        }
    });

    return res.status(200).send(compiled_page)

}