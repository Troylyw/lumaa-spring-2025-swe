"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const app_1 = require("../middleware/app");
const router = express_1.default.Router();
// 所有任务接口均需先验证 Token
router.use(app_1.authenticateToken);
// 获取当前用户所有任务
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const tasks = yield db_1.default.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
        res.json(tasks.rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}));
// 新增任务
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const { userId } = req.user;
    try {
        const result = yield db_1.default.query('INSERT INTO tasks (title, description, is_complete, user_id) VALUES ($1, $2, $3, $4) RETURNING *', [title, description || '', false, userId]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}));
// 更新任务（修改内容或状态）
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;
    const { userId } = req.user;
    try {
        const result = yield db_1.default.query('UPDATE tasks SET title = $1, description = $2, is_complete = $3 WHERE id = $4 AND user_id = $5 RETURNING *', [title, description || '', isComplete, id, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}));
// 删除任务
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId } = req.user;
    try {
        const result = yield db_1.default.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}));
exports.default = router;
