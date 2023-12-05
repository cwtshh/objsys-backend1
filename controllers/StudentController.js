const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secret = process.env.JWT_SECRET;

// gera o token de usuario
const generateToken = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: '7d',
    });
};

const loginStudent = async (req, res) => {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if(!student) {
        res.status(401).json({ error: 'Usuário não encontrado.' });
        return;
    }

    // verifica se a senha é valida
    const validPassword = await bcrypt.compare(password, student.password);
    if(!validPassword) {
        res.status(401).json({ error: 'Senha inválida.' });
        return;
    }

    // se deu tudo certo
    res.status(201).json(
        {
            _id: student._id,
            type: 'student',
            token: generateToken(student._id),
        }
    );
};

const getCurrentStudent = async (req, res) => {
    const student = req.body;
    res.status(200).json(student);
}
module.exports = {
    loginStudent,
    getCurrentStudent
}