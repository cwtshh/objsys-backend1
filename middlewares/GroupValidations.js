const { body } = require('express-validator');

const groupCreateValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("O nome é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O nome deve ter no mínimo 3 caracteres."),
        body("description")
            .isString()
            .withMessage("A descrição é obrigatória.")
            .isLength({ min: 3 })
            .withMessage("A descrição deve ter no mínimo 3 caracteres."),
    ];
};

const groupUpdateValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("O nome é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O nome deve ter no mínimo 3 caracteres."),
        body("description")
            .isString()
            .withMessage("A descrição é obrigatória.")
            .isLength({ min: 3 })
            .withMessage("A descrição deve ter no mínimo 3 caracteres."),
    ];
};

module.exports = {
    groupCreateValidation,
    groupUpdateValidation,

}