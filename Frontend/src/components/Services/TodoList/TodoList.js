import React, { useState, useEffect } from 'react';
import './TodoList.css';

import { motion } from "framer-motion";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    // Load todos from localStorage
    const savedTodos = JSON.parse(localStorage.getItem('todoList') || '[]');
    setTodos(savedTodos);
  }, []);

  const saveTodosToStorage = (todoList) => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        priority: priority,
        createdAt: new Date().toLocaleDateString(),
        completedAt: null
      };
      const updatedTodos = [...todos, todo];
      setTodos(updatedTodos);
      saveTodosToStorage(updatedTodos);
      setNewTodo('');
      setPriority('medium');
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id 
        ? { 
            ...todo, 
            completed: !todo.completed,
            completedAt: !todo.completed ? new Date().toLocaleDateString() : null
          }
        : todo
    );
    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos);
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      const updatedTodos = todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      );
      setTodos(updatedTodos);
      saveTodosToStorage(updatedTodos);
    }
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const clearCompleted = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);
    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos);
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#dc3545';
      case 'medium':
        return '#ffc107';
      case 'low':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (editingId) {
        saveEdit();
      } else {
        addTodo();
      }
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  return (
    <div className="todo-list">
      <div className="todo-header">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1>✅ To-do List</h1>
          <p>Stay organized and track your daily goals</p>
        </motion.div>
      </div>

      {/* Stats Dashboard */}
      <motion.div
        className="todo-stats"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.active}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%</div>
          <div className="stat-label">Progress</div>
        </div>
      </motion.div>

      {/* Add Todo Section */}
      <div className="add-todo-section">
        <div className="add-todo-form">
          <div className="input-group">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What needs to be done?"
              className="todo-input"
            />
            <motion.select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="priority-select"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </motion.select>

            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={addTodo} className="add-btn">
              Add Task
            </motion.button>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="filter-section">
        <div className="filter-buttons">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({stats.total})
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Active ({stats.active})
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed ({stats.completed})
          </motion.button>
        </div>
        
        {stats.completed > 0 && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }} 
            onClick={clearCompleted} className="clear-completed-btn" >
            Clear Completed
          </motion.button>
        )}
      </div>

      {/* Todo List */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="todos-container"
      >
        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              {filter === 'completed' ? '🎉' : '📝'}
            </div>
            <h3>
              {filter === 'completed' 
                ? 'No completed tasks yet' 
                : filter === 'active' 
                  ? 'No active tasks' 
                  : 'No tasks yet'
              }
            </h3>
            <p>
              {filter === 'completed'
                ? 'Complete some tasks to see them here!'
                : filter === 'active'
                  ? 'All tasks are completed! Great job!'
                  : 'Add your first task above to get started!'
              }
            </p>
          </div>
        ) : (
          <div className="todos-list">
            {filteredTodos
              .sort((a, b) => {
                // Sort by priority (high > medium > low) then by creation date
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                  return priorityOrder[b.priority] - priorityOrder[a.priority];
                }
                return b.id - a.id; // Newer tasks first
              })
              .map((todo) => (
                <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <div className="todo-content">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="complete-btn"
                      onClick={() => toggleComplete(todo.id)}
                    >
                      {todo.completed ? '✅' : '⭕'}
                    </motion.button>

                    <div
                      className="priority-indicator"
                      style={{ backgroundColor: getPriorityColor(todo.priority) }}
                      title={`${todo.priority} priority`}
                    ></div>

                    {editingId === todo.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        onBlur={saveEdit}
                        className="edit-input"
                        autoFocus
                      />
                    ) : (
                      <div className="todo-text-container">
                        <span
                          className="todo-text"
                          onDoubleClick={() => startEdit(todo.id, todo.text)}
                        >
                          {todo.text}
                        </span>
                        <div className="todo-meta">
                          <span className="priority-badge" style={{ color: getPriorityColor(todo.priority) }}>
                            {todo.priority}
                          </span>
                          <span className="date">
                            Created: {todo.createdAt}
                          </span>
                          {todo.completedAt && (
                            <span className="date">
                              Completed: {todo.completedAt}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="todo-actions">
                    {editingId === todo.id ? (
                      <>
                        <motion.button onClick={saveEdit} className="save-btn" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                          ✅
                        </motion.button>
                        <motion.button onClick={cancelEdit} className="cancel-btn" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                          ❌
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <motion.button
                          onClick={() => startEdit(todo.id, todo.text)}
                          className="edit-btn"
                          whileHover={{ scale: 1.03 }} 
                          whileTap={{ scale: 0.97 }}
                        >
                          ✏️
                        </motion.button>
                        <motion.button
                          onClick={() => deleteTodo(todo.id)}
                          className="delete-btn"
                          whileHover={{ scale: 1.03 }} 
                          whileTap={{ scale: 0.97 }}
                        >
                          🗑️
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </motion.div>

      {/* Progress Bar */}
      {stats.total > 0 && (
        <div className="progress-section">
          <div className="progress-label">
            Overall Progress: {stats.completed} of {stats.total} tasks completed
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(stats.completed / stats.total) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;