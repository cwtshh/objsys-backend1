const mongoose = require('mongoose');
const user = process.env.user;
const password = process.env.password;

// conectar com o banco
const conection = async() => {
    try {
        const database = await mongoose.connect(
            `mongodb+srv://${user}:${password}@cluster0.xokiktw.mongodb.net/?retryWrites=true&w=majority`
        );
        console.log('Conectado ao banco de dados');
        return database;
    } catch (err) {
        console.log('Erro ao conectar com o banco de dados');
        console.log(err);
    }
}

conection();