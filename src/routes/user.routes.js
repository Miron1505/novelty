const { Router } = require('express');
const { createUser, updateUser, deleteUser, getUserById, getAll } = require('../controllers/UserController');

const router = Router();

router.put('/update/:id', updateUser);
router.delete('/delete/:userId', deleteUser);
router.get('/:userId', getUserById);
router.get('/get/all', getAll);

module.exports = router;