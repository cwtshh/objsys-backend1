const Student = require('../models/Student');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const adminAuthGuard = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer token

    if(!token) {
        res.status(401).json({ error: ['Acesso Negado.'] });
        return;
    }

    // verifica se o token é valido
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        // verifica se o usuario existe
        req.user = await Admin.findById(verified.id).select('-password');
        if(!req.user) {
            res.status(401).json({ error: ['Usuário não encontrado.'] });
            return;
        }

        next();
    } catch (err) {
        res.status(401).json({ error: ['Token inválido.'] });
        return;
    }
};

const studentAuthGuard = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer token

    if(!token) {
        res.status(401).json({ error: ['Acesso Negado.'] });
        return;
    }

    // verifica se o token é valido
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        // verifica se o usuario existe
        req.user = await Student.findById(verified.id).select('-password');
        if(!req.user) {
            res.status(401).json({ error: ['Usuário não encontrado.'] });
            return;
        }

        next();
    } catch (err) {
        res.status(401).json({ error: ['Token inválido.'] });
        return;
    }
};

module.exports = {
    adminAuthGuard,
    studentAuthGuard,
};