const { body } = require('express-validator');

const adminCreateValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("O nome é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O nome deve ter no mínimo 3 caracteres."),
        body("email")
            .isEmail()
            .withMessage("O email deve ser válido.")
            .isString()
            .withMessage("O email é obrigatório."),
        body("password")
            .isString()
            .withMessage("A senha é obrigatória.")
            .isLength({ min: 6 })
            .withMessage("A senha deve ter no mínimo 6 caracteres."),
        body("confirmPassword")
            .isString()
            .withMessage("A confirmação de senha é obrigatória.")
            .isLength({ min: 6 })
            .withMessage("A confirmação de senha deve ter no mínimo 6 caracteres.")
            .custom((value, { req }) => {
                if(value != req.body.password) {
                    throw new Error("As senhas não conferem.");
                }
                return true;
            }),
        body("type")
            .isString()
            .withMessage("O tipo de usuário é obrigatório.")
            .isIn(["admin", "monitor", "professor"])
            .withMessage("O tipo de usuário deve ser admin ou student.")
        
    ];
};

const adminLoginValidation = () => {
    return [
        body("email")
            .isEmail()
            .withMessage("O email deve ser válido.")
            .isString()
            .withMessage("O email é obrigatório."),
        body("password")
            .isString()
            .withMessage("A senha é obrigatória.")
    ]
};

const adminUpdateValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("O nome é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O nome deve ter no mínimo 3 caracteres."),
        body("email")
            .isEmail()
            .withMessage("O email deve ser válido.")
            .isString()
            .withMessage("O email é obrigatório."),
        body("type")
            .isString()
            .withMessage("O tipo de usuário é obrigatório.")
            .isIn(["admin", "monitor", "professor"])
            .withMessage("O tipo de usuário deve ser admin ou student.")
    ];
};

module.exports = {
    adminCreateValidation,
    adminLoginValidation,
    adminUpdateValidation,
}