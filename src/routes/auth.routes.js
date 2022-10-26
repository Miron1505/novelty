const { Router } = require('express');
const { authUser, validateUser, createUser } = require('../controllers/AuthController');

const router = Router();

router.post('/login', authUser);
router.post('/signup', createUser);
router.post('/validate', validateUser);

module.exports = router;