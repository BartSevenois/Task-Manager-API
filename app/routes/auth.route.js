const verifySignUp = require('../controllers/verifySignUp.controller');
const authJwt = require('../controllers/verifyJwtToken.controller');

module.exports = function(app) {

    const controller = require('../controllers/auth.controller');
 
    app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
    app.post('/api/auth/signin', controller.signin);

    app.get('api/user', [authJwt.verifyToken], controller.userContent)
    app.get('/api/test/user', [authJwt.verifyToken], controller.userContent);
	
	app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);
	
	app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
	
}