// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();

//criar o objeto que irá fazer as operações dentro do banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db




// utilizar o objeto de banco de dados, para as operações pessoais

db.serialize(() => {

    // os códigos a seguir serão feitos com comandos SQL
    
   //  1 - criar uma tabela
   /* 
   db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );

    
    `)
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
        "https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "Papersider",
        "Guilherme Gamballa, Jardim Amenia",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos"
]


    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Cadastrado com Sucesso")
        console.log(this);
    }

    db.run(query, values, afterInsertData) 
    

    // 3- consultar os dados na tabela
    
    db.all(`SELECT name FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        console.log("Aqui estão os seus registros")
        console.log(rows)
    })
    
 */   

    //  4- deletar dado da tabela
    /*
    db.run(`DELETE FROM places WHERE id = ?`, [4], function(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Registro Deletado com sucesso")
    })
    
   */ 
})
