const db = require('../config/db.config.js');
const Task = db.tasks;
const TaskUser = db.task_user;

const Op = db.Sequelize.Op;

// GET
exports.getTaskById = (req, res) => {
	Task.findAll({
        where: {
            '$taskUsers.user_id$': req.body.userId,
            '$task.id$': req.params.id
        },
        include: [{
            model: TaskUser,
            required: false
        }]
    }).then(tasks => {
        if(tasks == '') {
            res.status(404).json({
                err: "Task not found!!!"
            })
        } else {
            res.send(tasks)
        }
        
    }).catch(err => {
        res.status(500).json({
            err: err
        })
    })
}

exports.getTasksByUserId = (req, res) => {
    Task.findAll({
        where: {
            '$taskUsers.user_id$': req.params.id
        },
        include: [{
            model: TaskUser,
            required: false
        }]
    }).then(tasks => {
        console.log(tasks);
        res.send(tasks)
    })
}

// POST
exports.createTask = (req, res) => {
    var deadline = req.body.deadlineDate.split("/").reverse().join("-") + ' ' + req.body.deadlineTime + ':00';
    task = {
        'title': req.body.title,
        'description': req.body.description,
        'deadline': deadline,
        'status': req.body.status
    }
    Task.create(task).then(function (task) {
   
        relation = {
            task_id: task.id,
            user_id: req.body.userId
        }
        TaskUser.create(relation)
        res.send("Task created")
    })
}

exports.updateTask = (req ,res) => {
    var deadline = req.body.deadlineDate.split("/").reverse().join("-") + ' ' + req.body.deadlineTime + ':00';

    Task.find({
        where: {
            '$task.id$': req.params.id
        },
        include: [{
            model: TaskUser,
            required: false
        }]
    }).then(task => {
        if(task) {
            task.update({
                'title': req.body.title,
                'description': req.body.description,
                'deadline': deadline,
                'status': req.body.status
            }).then(task => {
                res.send("Task updated");
            })
        } else {
            res.status(404).json({
                "error": "Task dont exists"
            })
        }
    }).catch(err => {
        res.status(500).json({
			"description": "TTT",
			"error": err
		});
    })
}

// DELETE
exports.delete = (req, res) => {
    Task.destroy({
        where: {
            '$tasks.id$': req.params.id
        }
    }).then(task => {
        res.send('Task deleted')
    })
}
