const router = require("express").Router();
const { registerUser, loginUser } = require('../controllers/authControllers')

//When u send a json with post request, data will be accessible with req.body. ...
//REGISTER
router.post("/register", registerUser);
//LOGIN
router.post("/login", loginUser);


module.exports = router;
