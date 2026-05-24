import { useState, useEffect } from 'react';
import { fetchTodos, createTodo, toggleTodo, deleteTodo } from './api';
import './index.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all | active | done

  useEffect(() => {
    fetchTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const todo = await createTodo(input.trim());
    setTodos([todo, ...todos]);
    setInput('');
  };

  const handleToggle = async (id) => {
    const updated = await toggleTodo(id);
    setTodos(todos.map(t => t._id === id ? updated : t));
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(t => t._id !== id));
  };

  const filtered = todos.filter(t =>
    filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed
  );
  const doneCount = todos.filter(t => t.completed).length;

  return (
    <div>
      {/* Header */}
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(2rem, 8vw, 3rem)',
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}>
          my<span style={{ color: 'var(--accent)' }}>tasks</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
          {doneCount} of {todos.length} completed
        </p>
      </header>

      {/* Add form */}
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new task…"
          style={{
            flex: 1,
            background: 'var(--surface)',
            border: '1.5px solid var(--border)',
            borderRadius: 'var(--radius)',
            color: 'var(--text)',
            padding: '0.8rem 1rem',
            fontSize: '0.95rem',
            fontFamily: 'DM Sans, sans-serif',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
        <button type="submit" style={{
          background: 'var(--accent)',
          color: '#0f0f0f',
          border: 'none',
          borderRadius: 'var(--radius)',
          padding: '0.8rem 1.4rem',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: '0.95rem',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={e => e.target.style.opacity = 0.85}
        onMouseLeave={e => e.target.style.opacity = 1}
        >
          + Add
        </button>
      </form>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {['all', 'active', 'done'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              background: filter === f ? 'var(--accent-dim)' : 'transparent',
              color: filter === f ? 'var(--accent)' : 'var(--text-muted)',
              border: `1.5px solid ${filter === f ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: '999px',
              padding: '0.35rem 1rem',
              fontSize: '0.82rem',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 500,
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all 0.15s',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Todo list */}
      {loading ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem 0' }}>Loading…</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem 0' }}>
          {filter === 'done' ? 'Nothing completed yet.' : 'No tasks here. Add one above!'}
        </p>
      ) : (
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {filtered.map(todo => (
            <li
              key={todo._id}
              style={{
                background: 'var(--surface)',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '0.9rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.9rem',
                transition: 'border-color 0.15s',
              }}
            >
              {/* Checkbox */}
              <button
                onClick={() => handleToggle(todo._id)}
                title={todo.completed ? 'Mark incomplete' : 'Mark complete'}
                style={{
                  width: 22, height: 22, flexShrink: 0,
                  borderRadius: '50%',
                  border: `2px solid ${todo.completed ? 'var(--accent)' : 'var(--text-muted)'}`,
                  background: todo.completed ? 'var(--accent)' : 'transparent',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', color: '#0f0f0f',
                  transition: 'all 0.15s',
                }}
              >
                {todo.completed ? '✓' : ''}
              </button>

              {/* Title */}
              <span style={{
                flex: 1,
                fontSize: '0.95rem',
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? 'var(--text-muted)' : 'var(--text)',
                transition: 'all 0.2s',
              }}>
                {todo.title}
              </span>

              {/* Delete */}
              <button
                onClick={() => handleDelete(todo._id)}
                title="Delete"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  padding: '0 0.2rem',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--danger)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Footer */}
      {todos.length > 0 && (
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button
            onClick={async () => {
              const completed = todos.filter(t => t.completed);
              await Promise.all(completed.map(t => deleteTodo(t._id)));
              setTodos(todos.filter(t => !t.completed));
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.82rem',
              textDecoration: 'underline',
            }}
          >
            Clear completed
          </button>
        </div>
      )}
    </div>
  );
}
