const Admin = require('../models/Admin');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;


// gera o token de usuario
const generateToken = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: '7d',
    });
};

const registerAdmin = async (req, res) => {
    const {name, email, password, type} = req.body;

    const adminUser = await Admin.findOne({ email });

    if(adminUser) {
        res.status(402).json({ error: 'Usuário já existe.' });
        return;
    }

    // criptografando a senha
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // cria o usuario
    const newUser = await Admin.create({
        name,
        email,
        password: passwordHash,
        type,
    });

    // se deu tudo certo
    if(!newUser) {
        res.status(422).json({ error: 'Não foi possível criar o usuário.' });
        return;
    }

    res.status(201).json(
        {
            _id: newUser._id,
            token: generateToken(newUser._id),
        }
    );
};

const registerStudent = async (req, res) => {
    const { name, email, password } = req.body;

    const studentUser = await Student.findOne({ email });

    if(studentUser) {
        res.status(402).json({ error: 'Usuário já existe.' });
        return;
    }

    // criptografando a senha
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // cria o usuario
    const newUser = await Student.create({
        name,
        email,
        password: passwordHash,
    });

    // se deu tudo certo
    if(!newUser) {
        res.status(422).json({ error: 'Não foi possível criar o usuário.' });
        return;
    }

    res.status(201).json(
        {
            _id: newUser._id,
            token: generateToken(newUser._id),
        }
    );
};

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if(!admin) {
        res.status(404).json({ error: ['Usuário não encontrado.'] });
        return;
    }

    // checa se a senha ta certa
    const validPassword = await bcrypt.compare(password, admin.password);
    if(!validPassword) {
        res.status(401).json({ error: ['Senha incorreta.'] });
        return;
    }

    res.status(200).json(
        {
            _id: admin._id,
            userType: admin.type,
            token: generateToken(admin._id),
        }
    );
};

const getCurrentAdmin = async (req, res) => {
    const admin = req.user;
    res.status(200).json(admin); 
}

const updateAdmin = async(req, res) => {
    const { name, password, type } = req.body;

    const admin = await Admin.findById(req.user._id).select('-password');
    
    if(name) {
        admin.name = name;
    }

    if(password) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        admin.password = passwordHash;
    }

    if(type) {
        admin.type = type;
    }

    const updatedAdmin = await admin.save();

    res.status(200).json(updatedAdmin);
};

const updateAnotherAdmin = async(req, res) => {
    const { name, password, type } = req.body;

    const admin = await Admin.findById(req.params.id).select('-password');
    
    if(name) {
        admin.name = name;
    }

    if(password) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        admin.password = passwordHash;
    }

    if(type) {
        admin.type = type;
    }

    const updatedAdmin = await admin.save();

    res.status(200).json(updatedAdmin);
}

module.exports = {
    registerAdmin,
    registerStudent,
    loginAdmin,
    getCurrentAdmin,
    updateAdmin,
    updateAnotherAdmin,
}
