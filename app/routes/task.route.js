const verifySignUp = require('../controllers/verifySignUp.controller');
const authJwt = require('../controllers/verifyJwtToken.controller');

module.exports = function(app) {

    const controller = require('../controllers/task.controller');

    app.post('/api/task/create', [authJwt.verifyToken], controller.createTask);
    app.post('/api/task/update/:id', [authJwt.verifyToken], controller.updateTask);

    app.get('/api/task/:id', [authJwt.verifyToken], controller.getTaskById);
    app.get('/api/tasks/user/:id', [authJwt.verifyToken], controller.getTasksByUserId);

    app.delete('/api/task/delete/:id', controller.delete)

	
}