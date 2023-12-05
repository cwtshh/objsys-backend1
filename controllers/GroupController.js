const Group = require('../models/Group');
const Student = require('../models/Student');

/* const GroupSchema = new Schema({
    name: String,
    description: String,
    lider: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    students: Array
}, {
    timestamps: true
}); */

const createGroup = async (req, res) => {
    const { name, description, lider, students } = req.body;

    const group = await Group.findOne({ name });
    if(group) {
        res.status(402).json({ error: 'Grupo já existe.' });
        return;
    }

    const newGroup = await Group.create({
        name,
        description,
        lider,
        students
    });

    if(!newGroup) {
        res.status(422).json({ error: 'Não foi possível criar o grupo.' });
        return;
    }

    res.status(201).json(
        {
            _id: newGroup._id,
            name: newGroup.name,
            description: newGroup.description,
            lider: newGroup.lider,
            students: newGroup.students,
        }
    );
};

const editGroup = async (req, res) => {
    const { name, description, lider, students } = req.body;

    const group = await Group.findById(req.params.id);
    if(!group) {
        res.status(402).json({ error: 'Grupo não existe.' });
        return;
    }

    if(name) {
        group.name = name;
    }

    if(description) {
        group.description = description;
    
    }

    if(lider) {
        group.lider = lider;
    }

    if(students) {
        group.students = students;
    }

    group.save();
}

const addStudentToGroup = async (req, res) => {
    const group_id = req.params.id;
    const student_id = req.body.student_id;

    const group = await Group.findById(group_id);
    if(!group) {
        res.status(402).json({ error: 'Grupo não existe.' });
        return;
    }

    const studentExists = await Student.findById(student_id);
    if(!studentExists) {
        res.status(402).json({ error: 'Aluno não existe.' });
        return;
    }

    const studentInGroup = group.students.find((student) => student === studentExists._id);
    if(studentInGroup) {
        res.status(402).json({ error: 'Aluno já está no grupo.' });
        return;
    }

    group.students.push(studentExists._id);

    group.save();

    res.status(201).json(
        {
            _id: group._id,
            name: group.name,
            description: group.description,
            lider: group.lider,
            students: group.students,
        }
    );
};

const getAllGroups = async(req, res) => {
    const groups = await Group.find();
    res.status(200).json(groups);
}

module.exports = {
    createGroup,
    editGroup,
    addStudentToGroup,
    getAllGroups
}