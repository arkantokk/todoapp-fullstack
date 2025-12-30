const Router = require('express');
const router = new Router();
const todoController = require('../controllers/todo.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/calendar', authMiddleware, todoController.getCalendarTodos);
router.post('/', authMiddleware, todoController.createTodo);
router.get('/', authMiddleware, todoController.getTodos);
router.delete('/:id', authMiddleware, todoController.deleteTodo);
router.put('/:id', authMiddleware, todoController.updateTodo);
module.exports = router;