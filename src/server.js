const express = require("express");
const server = express();

// pegar o banco de dados
const db = require("./database/db.js")

// configurar pasta publica
server.use(express.static("public"));

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}))


//utilizando o template engine
const nunJucks = require("nunjucks");
nunJucks.configure("src/views", {
    express: server,
    noCache: true
})



// configurar caminhos/rotas da minha aplicação
// página inicial
// req: requisição
// res: Resposta
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Isso aqui é um título feito pelo meu server"});
})




server.get("/create-point", (req, res) => {

    // req.query: Query Strings da nossa url
   //console.log(req.query)

    return res.render("create-point.html");
})

server.post("/savepoint", (req, res ) => {

    // req.body: O corpo do nosso formulário
    // console.log(req.body)

    // inserir dados no banco de dados
    // 2- inserir dados na tebela
    const query = `
        INSERT INTO places(
            image,
            name,
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES( ?,?,?,?,?,?,?);

    `
    const values = [
       req.body.image,
       req.body.name,
       req.body.adress,
       req.body.adress2,
       req.body.state,
       req.body.city,
       req.body.items

]


    function afterInsertData(err) {
        if(err) {
             console.log(err)
             return res.send("Erro no Cadastro!")
        }

        console.log("Cadastrado com Sucesso")
        console.log(this);

        return res.render("create-point.html", { saved: true})
    }

    db.run(query, values, afterInsertData) 


})








server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == "") {
        // qnd a pesquisa é vazia
      return res.render("search-results.html", {total: 0} );
    }




    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        //mostra a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total} );

    })
    

})

// ligar o servidor
server.listen(3000);