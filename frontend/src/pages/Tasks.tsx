import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

interface Task {
  id: number;
  title: string;
  description: string;
  is_complete: boolean;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login'); 
    }
  }, [token, navigate]);

  const fetchTasks = useCallback(async () => {
    if (!token) return;

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch tasks');
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, { title, description }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (err: any) {
      setError('Failed to create task');
    }
  };

  const handleUpdateTask = async (task: Task) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`, { 
        title: task.title, 
        description: task.description, 
        isComplete: !task.is_complete 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (err: any) {
      setError('Failed to update task');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${editingTask.id}`, {
        title,
        description,
        isComplete: editingTask.is_complete
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingTask(null);
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (err: any) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (err: any) {
      setError('Failed to delete task');
    }
  };


  const handleLogout = () => {

    localStorage.removeItem('token');
    

    window.location.href = 'http://localhost:3000/login'; 
  };

  return (
    <div>
      <h2>Your Tasks</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {tasks.length === 0 && !error && <p>No tasks available.</p>}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span style={{ textDecoration: task.is_complete ? 'line-through' : 'none' }}>
              {task.title}: {task.description}
            </span>
            <button onClick={() => handleUpdateTask(task)}>
              {task.is_complete ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button onClick={() => handleEditTask(task)}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>{editingTask ? 'Edit Task' : 'Create New Task'}</h3>
      <form onSubmit={editingTask ? handleSaveEdit : handleCreateTask}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Description:</label>
          <input 
            type="text" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
          />
        </div>
        <button type="submit">{editingTask ? 'Save' : 'Add Task'}</button>
        {editingTask && (
          <button 
            type="button" 
            onClick={() => { setEditingTask(null); setTitle(''); setDescription(''); }}
          >
            Cancel
          </button>
        )}
      </form>

      <button onClick={handleLogout}>Log Out</button> {/* Log Out button */}
    </div>
  );
};

export default Tasks;














